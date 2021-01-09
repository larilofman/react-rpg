import React, { useEffect } from 'react';
import GameObject from '../game-object';
import useKeyPress from '../../hooks/use-key-press';
import useWalk from '../../hooks/use-walk';
import { useStateValue, setPlayerPosition } from '../state';

export default function Player({ skin }) {
    const [{ playerPosition }, dispatch] = useStateValue();

    const { dir, step, walk, position } = useWalk(3, 1, playerPosition);

    // useKeyPress((e) => {

    //     walk(e.key.replace("Arrow", "").toLowerCase());

    //     e.preventDefault();
    // })

    useKeyPress((e) => {
        let keyPressed;
        switch (e.key) {
            case "s":
            case "ArrowDown":
                keyPressed = "down";
                break;
            case "d":
            case "ArrowRight":
                keyPressed = "right";
                break;
            case "w":
            case "ArrowUp" || "w":
                keyPressed = "up";
                break;
            case "a":
            case "ArrowLeft" || "a":
                keyPressed = "left";
                break;
            default:
                break;
        }
        walk(keyPressed);
        e.preventDefault();
    });

    useEffect(() => {
        dispatch(setPlayerPosition({ x: position.x, y: position.y }));
    }, [position, dispatch]);

    return <GameObject
        sprite={`/sprites/skins/${skin}.png`}
        dir={dir}
        step={step}
        position={position}
    />;

}

