import React, { useEffect } from 'react';
import GameObject from '../game-object';
import useKeyPress from '../../hooks/use-key-press';
import useWalk from '../../hooks/use-walk';
import { useStateValue, setPlayerPosition, Action, ActionType } from '../state';
import { Direction } from '../../types';

interface Props {
    skin: string
}

const Player: React.FC<Props> = ({ skin }) => {
    const [{ playerPosition }, dispatch] = useStateValue();

    const { dir, step, walk, position } = useWalk(3, 1, playerPosition);

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
        walk(keyPressed);
        // e.preventDefault();
    });

    useEffect(() => {
        dispatch(setPlayerPosition(position));
    }, [position, dispatch]);

    return <GameObject
        spriteData={{
            offset_x: step,
            offset_y: dir,
            image: `/sprites/skins/${skin}.png`,
            layer: 1
        }}
        position={position}
        collision={true}
    />;

};

export default Player;
