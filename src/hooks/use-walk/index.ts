import { useState, useEffect } from 'react';
import { Position, Direction, Tile } from '../../types';
import { useStateValue } from '../../components/state';
import useFindRandomFloorTile from '../use-find-floor-tile';

export default function useWalk(startPos?: Position) {
    const [{ mapLoaded }] = useStateValue();
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

    const { findFloorTile } = useFindRandomFloorTile();

    useEffect(() => {
        if (mapLoaded && !startPos) {
            const tile = findFloorTile();
            setPosition(tile.position);
        }

    }, [mapLoaded]);

    function walk(tile: Tile) {
        setPosition(tile.position);
    }

    return {
        walk, position
    };
}