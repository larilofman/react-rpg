import React, { useEffect } from 'react';
import GameObject from '../game-object';
import useKeyPress from '../../hooks/use-key-press';
import useWalk from '../../hooks/use-walk';
import useSetPlayerPosition from '../state/action-hooks/useSetPlayerPosition';
import useUsePlayerTurn from '../state/action-hooks/useUsePlayerTurn';
import useCamera from '../../hooks/use-camera';
import { Direction } from '../../types';


interface Props {
    skin: string
}

const Player: React.FC<Props> = ({ skin }) => {
    const { setPlayerPosition } = useSetPlayerPosition();
    const { usePlayerTurn } = useUsePlayerTurn();
    const { dir, step, walk, position } = useWalk(3, 1);
    const { updateCamera } = useCamera();


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
            walk(keyPressed);
            usePlayerTurn();
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
