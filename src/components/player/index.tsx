import React, { useEffect } from 'react';
import GameObject from '../game-object';
import useKeyPress from '../../hooks/use-key-press';
import useMouseClick from '../../hooks/use-mouse-click';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useSetPlayerPosition from '../state/action-hooks/useSetPlayerPosition';
import useCamera from '../../hooks/use-camera';
import { Direction, Position, TileStatus, BaseCreature, Faction } from '../../types';
import useCheckCollision from '../../hooks/use-get-tile';
import useMoveCreature from '../state/action-hooks/useMoveCreature';
import useContact from '../../hooks/use-contact';
import { useStateValue } from '../state';
import usePathFinding from '../../hooks/use-pathfinding';

interface Props {
    skin: string
    startPos: Position
    data: BaseCreature
    useTurn: (faction: Faction) => void
}

const Player: React.FC<Props> = ({ skin, startPos, data, useTurn }) => {
    const { setPlayerPosition } = useSetPlayerPosition();
    const { walk, position } = useWalk(startPos);
    const { dir, step, setAnimState } = useAnimation(3);
    const { updateCamera } = useCamera();
    const { getTileInDirection, getTileStatus } = useCheckCollision();
    const { moveCreature } = useMoveCreature();
    const { contact } = useContact();
    const [{ mapLoaded, turn }] = useStateValue();
    const { posClicked } = useMouseClick();
    const { findPath, onRoute, cancelPath } = usePathFinding();


    useEffect(() => {
        if (mapLoaded) {
            moveCreature(data, startPos);
        }
    }, [mapLoaded]);

    // Mouse stuff - click to move - pathfinding
    useEffect(() => {
        if (posClicked) {
            findPath(position, posClicked);
        }
    }, [posClicked]);

    useEffect(() => {
        if (turn.faction === data.faction && onRoute && posClicked) {
            const nextPos = findPath(position, posClicked);
            if (nextPos) {
                move(nextPos);
            }

        }
    }, [turn, onRoute]);

    const move = (newPos: Position) => {
        walk(data, newPos);
        setAnimState(position, newPos);
        useTurn(data.faction);
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
                useTurn(data.faction);
                return;
            default:
                break;
        }

        if (keyPressed !== undefined && turn.faction === data.faction) {
            const newTile = getTileInDirection(position, keyPressed);

            if (newTile) {
                if (getTileStatus(newTile.pos) === TileStatus.Occupied) {
                    contact(data, newTile.pos);
                } else if (getTileStatus(newTile.pos) === TileStatus.Passable) {
                    walk(data, newTile.pos);
                }
                setAnimState(position, newTile.pos);
            }
            useTurn(data.faction);
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
