import React, { useEffect } from 'react';
import GameObject from '../game-object';
import useKeyPress from '../../hooks/use-key-press';
import useMouseClick from '../../hooks/use-mouse-click';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useSetPlayerPosition from '../state/action-hooks/useSetPlayerPosition';
import useUseTurn from '../state/action-hooks/useUseTurn';
import useCamera from '../../hooks/use-camera';
import { Direction, Position, Creature, TileStatus } from '../../types';
import useCheckCollision from '../../hooks/use-get-tile';
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
    const { getTileInDirection, getTileStatus } = useCheckCollision();
    const { moveCreature } = useMoveCreature();
    const { contact } = useContact();
    const [{ mapLoaded }] = useStateValue();
    const { posClicked } = useMouseClick();
    const { findPath, onRoute, cancelPath } = usePathFinding();


    useEffect(() => {
        if (mapLoaded) {
            moveCreature(data);
        }
    }, [mapLoaded]);

    // Mouse stuff - click to move - pathfinding
    useEffect(() => {
        if (posClicked) {
            findPath(position, posClicked);
        }
    }, [posClicked]);

    useEffect(() => {
        if (canAct && onRoute && posClicked) {
            const nextPos = findPath(position, posClicked);
            if (nextPos) {
                move(nextPos);
            }

        }
    }, [canAct, onRoute]);

    const move = (newPos: Position) => {
        walk(data, newPos);
        setAnimState(position, newPos);
        useTurn();
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
                useTurn();
                return;
            default:
                break;
        }

        if (keyPressed !== undefined && canAct) {
            const newTile = getTileInDirection(position, keyPressed);

            if (newTile) {
                if (getTileStatus(newTile.pos) === TileStatus.Occupied) {
                    contact(data, newTile.pos);
                } else if (getTileStatus(newTile.pos) === TileStatus.Passable) {
                    walk(data, newTile.pos);
                }
                setAnimState(position, newTile.pos);
            }
            useTurn();
        }
        // e.preventDefault();
    });

    useEffect(() => {
        setPlayerPosition(position);
        updateCamera(position);
        // console.log(position);
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
