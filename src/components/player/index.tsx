import React, { useEffect } from 'react';
import GameObject from '../game-object';
import useKeyPress from '../../hooks/use-key-press';
import useMouseClick from '../../hooks/use-mouse-click';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useSetPlayerPosition from '../state/action-hooks/useSetPlayerPosition';
import useCamera from '../../hooks/use-camera';
import { Direction, Position, TileStatus, BaseCreature } from '../../types';
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
    const { getTileInDirection, getTileStatus } = useCheckCollision();
    const { moveCreature } = useMoveCreature();
    const { contact } = useContact();
    const { posClicked } = useMouseClick();
    const { findPath, onRoute, cancelPath } = usePathFinding();
    const { keyPressed } = useKeyPress();

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
            } else {
                findPath(position, posClicked);
            }

        }
    }, [posClicked]);

    useEffect(() => {
        if (turn.faction === data.faction && turn.creature === data.id) {
            if (keyPressed) {

                // const date = Date.now();
                // let currentDate = null;
                // do {
                //     currentDate = Date.now();
                // } while (currentDate - date < 50);

                if (onRoute) {
                    cancelPath();
                }

                let dir;
                switch (keyPressed) {
                    case "s":
                    case "ArrowDown":
                        dir = Direction.down;
                        break;
                    case "d":
                    case "ArrowRight":
                        dir = Direction.right;
                        break;
                    case "w":
                    case "ArrowUp":
                        dir = Direction.up;
                        break;
                    case "a":
                    case "ArrowLeft":
                        dir = Direction.left;
                        break;
                    case " ":
                        useTurn(data);
                        return;
                    default:
                        break;
                }
                if (dir !== undefined) {
                    const newTile = getTileInDirection(position, dir);
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
            } else if (onRoute && posClicked) {
                const nextPos = findPath(position, posClicked);
                if (nextPos) {
                    move(nextPos);
                }
            }
        }
    }, [turn, onRoute, keyPressed]);

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
