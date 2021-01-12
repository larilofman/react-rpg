import React, { useEffect } from 'react';
import GameObject from '../game-object';
import useKeyPress from '../../hooks/use-key-press';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useSetPlayerPosition from '../state/action-hooks/useSetPlayerPosition';
import useUsePlayerTurn from '../state/action-hooks/useUsePlayerTurn';
import useCamera from '../../hooks/use-camera';
import { Direction } from '../../types';
import useCheckCollision from '../../hooks/use-check-collision';


interface Props {
    skin: string
}

const Player: React.FC<Props> = ({ skin }) => {
    const { setPlayerPosition } = useSetPlayerPosition();
    const { usePlayerTurn } = useUsePlayerTurn();
    const { walk, position } = useWalk();
    const { dir, step, setAnimState } = useAnimation(3);
    const { updateCamera } = useCamera();
    const { checkCollision } = useCheckCollision();


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
            default:
                break;
        }

        if (keyPressed !== undefined) {

            const newPos = checkCollision(position, keyPressed);

            usePlayerTurn();

            if (newPos?.passable) {
                walk(newPos);
            }
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
