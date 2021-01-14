import React, { useEffect } from 'react';
import GameObject from '../game-object';
import useKeyPress from '../../hooks/use-key-press';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useSetPlayerPosition from '../state/action-hooks/useSetPlayerPosition';
import useUseTurn from '../state/action-hooks/useUseTurn';
import useCamera from '../../hooks/use-camera';
import { Direction, Position, ReducedCreature, Attack, DamageType } from '../../types';
import useCheckCollision from '../../hooks/use-check-collision';
import useMoveCreature from '../state/action-hooks/useMoveCreature';
import useContact from '../../hooks/use-contact';
import { useStateValue } from '../state';

interface Props {
    skin: string
    startPos: Position
    data: ReducedCreature
}

const Player: React.FC<Props> = ({ skin, startPos, data }) => {
    const { setPlayerPosition } = useSetPlayerPosition();
    const { useTurn, canAct } = useUseTurn(data.faction);
    const { walk, position } = useWalk(startPos);
    const { dir, step, setAnimState } = useAnimation(3);
    const { updateCamera } = useCamera();
    const { checkCollision } = useCheckCollision();
    const { moveCreature } = useMoveCreature();
    const { contact } = useContact();
    const [{ mapLoaded }] = useStateValue();

    useEffect(() => {
        if (mapLoaded) {
            moveCreature(data, position);
        }
    }, [mapLoaded]);


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
            const newPos = checkCollision(position, keyPressed);

            if (newPos) {
                if (newPos.occupant) {
                    contact(data, newPos.occupant);
                } else {
                    if (newPos.passable) {
                        moveCreature(data, newPos.position, position);
                        walk(newPos);
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
