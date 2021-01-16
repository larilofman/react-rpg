import React, { useEffect } from 'react';
import GameObject from '../game-object';
import useKeyPress from '../../hooks/use-key-press';
import useMouseClick from '../../hooks/use-mouse-click';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useSetPlayerPosition from '../state/action-hooks/useSetPlayerPosition';
import useUseTurn from '../state/action-hooks/useUseTurn';
import useCamera from '../../hooks/use-camera';
import { Direction, Position, Creature } from '../../types';
import useCheckCollision from '../../hooks/use-check-collision';
import useMoveCreature from '../state/action-hooks/useMoveCreature';
import useContact from '../../hooks/use-contact';
import { useStateValue } from '../state';
import usePathFinding from '../../hooks/use-pathfinding';

interface Props {
    skin: string
    startPos: Position
    data: Creature
}

const Player: React.FC<Props> = ({ skin, startPos, data }) => {
    const { setPlayerPosition } = useSetPlayerPosition();
    const { useTurn, canAct } = useUseTurn(data.faction);
    const { walk, position } = useWalk(startPos);
    const { dir, step, setAnimState } = useAnimation(3);
    const { updateCamera } = useCamera();
    const { checkCollision, isWalkable } = useCheckCollision();
    const { moveCreature } = useMoveCreature();
    const { contact } = useContact();
    const [{ mapLoaded }] = useStateValue();
    const { posClicked } = useMouseClick();
    const { findPath, onRoute } = usePathFinding();


    useEffect(() => {
        if (mapLoaded) {
            moveCreature(data);
        }
    }, [mapLoaded]);

    useEffect(() => {
        if (posClicked) {
            findPath(position, posClicked);
        }
    }, [posClicked]);

    useEffect(() => {
        if (canAct && onRoute && posClicked) {
            // console.log(canAct, onRoute, posClicked);
            const nextPos = findPath(position, posClicked);
            if (nextPos) {
                const newCreature: Creature = { ...data, pos: nextPos };
                moveCreature(newCreature);
                walk(nextPos);
                setAnimState(Direction.down);
                useTurn();
            }

        }
    }, [canAct, onRoute]);

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
            case " ":
                useTurn();
                return;
            default:
                break;
        }

        if (keyPressed !== undefined && canAct) {
            const newTile = checkCollision(position, keyPressed);

            if (newTile) {
                if (!isWalkable(newTile.position)) {
                    contact(data, newTile.position);
                } else {
                    if (newTile.passable) {
                        const newCreature: Creature = { ...data, pos: newTile.position };
                        moveCreature(newCreature);
                        walk(newTile.position);
                    }
                }

            }
            useTurn();
            setAnimState(keyPressed);

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
