import React, { useEffect, useState } from 'react';
import GameObject from '../game-object';
import useKeyPress from '../../hooks/use-key-press';
import useMouseClick from '../../hooks/use-mouse-click';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useSetPlayerPosition from '../state/action-hooks/useSetPlayerPosition';
import useCamera from '../../hooks/use-camera';
import { Direction, Position, TileStatus, BaseCreature, Faction } from '../../types';
import useCheckCollision from '../../hooks/use-get-tiles';
import useMoveCreature from '../state/action-hooks/useMoveCreature';
import useContact from '../../hooks/use-contact';
import { useStateValue } from '../state';
import usePathFinding from '../../hooks/use-pathfinding';
import calculateDistance from '../../utils/calculate-distance';

interface Props {
    skin: string
    data: BaseCreature
    useTurn: (creature: BaseCreature) => void
}

const Player: React.FC<Props> = ({ skin, data, useTurn }) => {
    const [{ mapLoaded, turn, playerPosition }] = useStateValue();
    const { setPlayerPosition } = useSetPlayerPosition();
    const { walk, position } = useWalk(playerPosition);
    const { dir, step, setAnimState } = useAnimation(3);
    const { updateCamera } = useCamera();
    const { getTileInDirection, getTileStatus, getRandomNearbyFloorTile } = useCheckCollision();
    const { moveCreature } = useMoveCreature();
    const { contact } = useContact();
    const { posClicked } = useMouseClick();
    const { findPath, onRoute, cancelPath } = usePathFinding();
    const [lastTurn, setLastTurn] = useState(0);

    useEffect(() => {
        if (mapLoaded) {
            moveCreature(data, playerPosition);
        }
    }, [mapLoaded]);

    // Mouse stuff - click to move - pathfinding
    useEffect(() => {
        if (posClicked) {
            if (getTileStatus(posClicked) === TileStatus.Occupied && calculateDistance(position, posClicked) < 1.2) {
                contactCreature(posClicked);
            }
            findPath(position, posClicked);
        }
    }, [posClicked]);

    useEffect(() => {
        if (turn.creature === data.id && onRoute && posClicked) {
            const nextPos = findPath(position, posClicked);
            if (nextPos) {
                move(nextPos);
            }
        }
    }, [turn, onRoute]);

    const move = (newPos: Position) => {
        walk(data, newPos);
        setAnimState(position, newPos);
        useTurn(data);
    };

    const contactCreature = (contactPos: Position) => {
        contact(data, contactPos);
        useTurn(data);
        setAnimState(position, contactPos);
    };

    // Keyboard input
    useKeyPress((e: KeyboardEvent) => {
        let keyPressed;
        switch (e.key) {
            case "s":
            case "ArrowDown":
                keyPressed = Direction.down;
                break;
            case "d":
            case "ArrowRight":
                keyPressed = Direction.right;
                break;
            case "w":
            case "ArrowUp":
                keyPressed = Direction.up;
                break;
            case "a":
            case "ArrowLeft":
                keyPressed = Direction.left;
                break;
            case "p":
                cancelPath();
                break;
            case " ":
                useTurn(data);
                return;
            default:
                break;
        }

        if (keyPressed !== undefined && turn.creature === data.id) {
            if (onRoute) {
                cancelPath();
            } else {
                const newTile = getTileInDirection(position, keyPressed);

                if (newTile) {
                    if (getTileStatus(newTile.pos) === TileStatus.Occupied) {
                        contactCreature(newTile.pos);
                    } else if (getTileStatus(newTile.pos) === TileStatus.Passable) {
                        move(newTile.pos);
                        setAnimState(position, newTile.pos);
                    } else {
                        setAnimState(position, newTile.pos, false);
                    }
                }
            }

        }
        // e.preventDefault();
    });

    useEffect(() => {
        setPlayerPosition(position);
        updateCamera(position);
    }, [position]);

    return <GameObject
        spriteData={{
            offset_x: step,
            offset_y: dir,
            image: `/sprites/skins/${skin}.png`,
            layer: 1
        }}
        position={position}
    />;

};

export default Player;
