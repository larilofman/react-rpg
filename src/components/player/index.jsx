import React, { useEffect } from 'react'
import GameObject from '../game-object'
import useKeyPress from '../../hooks/use-key-press';
import useWalk from '../../hooks/use-walk';
import { useStateValue, setPlayerPosition } from '../state'

export default function Player({ skin }) {
    const [{ playerPosition }, dispatch] = useStateValue();

    const { dir, step, walk, position } = useWalk(3, 1, playerPosition);

    useKeyPress((e) => {
        walk(e.key.replace("Arrow", "").toLowerCase());
        e.preventDefault();
    })

    useEffect(() => {
        dispatch(setPlayerPosition({ x: position.x, y: position.y }))
    }, [position, dispatch])

    return <GameObject
        sprite={`/sprites/skins/${skin}.png`}
        dir={dir}
        step={step}
        position={position}
    />

}

