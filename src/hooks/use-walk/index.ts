import { useState } from 'react';
import { Position, Tile } from '../../types';

export default function useWalk(startPos?: Position,) {
    const [position, setPosition] = useState<Position>(startPos || { x: 0, y: 0 });

    function walk(tile: Tile) {
        setPosition(tile.position);
    }

    return {
        walk, position
    };
}