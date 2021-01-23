import React, { useEffect, useState } from 'react';
import Sprite from '../sprite';
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
import { isInMeleeRange } from '../../utils/calculate-distance';
import settings from '../../data/settings.json';
import useGetCreature from '../../hooks/use-get-creature';

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
    const { creatureClicked, posClicked } = useMouseClick();
    const { findPath, onRoute, cancelPath } = usePathFinding();
    const { keyPressed } = useKeyPress();
    const [canAct, setCanAct] = useState(true);
    const { getCreatureById } = useGetCreature();

    useEffect(() => {
        if (mapLoaded) {
            moveCreature(data, playerPosition);
            updateCamera(playerPosition);
        }
        // Toggles on and off so that player can only act every 50ms
        const delayTicker = setInterval(() => {
            setCanAct(prev => (!prev));
        }, 50);
        return () => clearInterval(delayTicker);
    }, [mapLoaded]);

    // If a tile is clicked on and standing next to an occupied tile, contact with the creature on the tile, otherwise find a path to the tile
    useEffect(() => {
        if (posClicked) {
            if (getTileStatus(posClicked) === TileStatus.Occupied && isInMeleeRange(position, posClicked)) {
                contactCreature(posClicked);
            } else {
                findPath(position, posClicked);
            }

        }
    }, [posClicked]);

    useEffect(() => {
        // canAct is toggled on by the interval and it's player's turn
        if (canAct && turn.faction === data.faction && turn.creature === data.id) {
            if (keyPressed) {
                // cancel path on any key press
                if (onRoute) {
                    cancelPath();
                }

                // find a direction of the key press or act other ways
                const dir = getDirectionFromKey(keyPressed);
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
                // if no key was pressed and finding a path
                // if latest click was on a creature, see if in melee range of it and contact if so
                if (creatureClicked) {
                    const creatureChased = getCreatureById(creatureClicked);
                    if (creatureChased && isInMeleeRange(position, creatureChased.pos)) {
                        cancelPath();
                        contactCreature(creatureChased.pos);
                        return;
                    }
                }
                // otherwise continue on the path
                const nextPos = findPath(position, posClicked);
                if (nextPos) {
                    move(nextPos);
                }
            }
        }
    }, [canAct]);

    const getDirectionFromKey = (key: string) => {
        let dir;
        switch (key) {
            case "KeyS":
            case "ArrowDown":
            case "Numpad2":
                dir = Direction.down;
                break;
            case "KeyD":
            case "ArrowRight":
            case "Numpad6":
                dir = Direction.right;
                break;
            case "KeyW":
            case "ArrowUp":
            case "Numpad8":
                dir = Direction.up;
                break;
            case "KeyA":
            case "ArrowLeft":
            case "Numpad4":
                dir = Direction.left;
                break;
            case "Numpad7":
                dir = settings.diagonalMovement ? Direction.upLeft : undefined;
                break;
            case "Numpad9":
                dir = settings.diagonalMovement ? Direction.upRight : undefined;
                break;
            case "Numpad3":
                dir = settings.diagonalMovement ? Direction.downRight : undefined;
                break;
            case "Numpad1":
                dir = settings.diagonalMovement ? Direction.downLeft : undefined;
                break;
            case "Space":
            case "Numpad5":
                useTurn(data);
                return;
            default:
                break;
        }

        return dir;
    };

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

    return <Sprite
        data={{
            offset_x: step,
            offset_y: dir,
            image: `/sprites/skins/${skin}.png`,
            layer: 1
        }}
        position={position}
    />;

};

export default Player;
