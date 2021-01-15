import { useEffect, useState } from "react";
import { Position } from '../../types';
import { useStateValue } from '../../components/state';
import PF from 'pathfinding';

export default function usePathfinding() {
    const [grid, setGrid] = useState<PF.Grid>();
    const [finder, setFinder] = useState<PF.AStarFinder>();
    const [{ mapLoaded }] = useStateValue();
    useEffect(() => {

        const grid = new PF.Grid(5, 7);
        console.log(grid);
        setGrid(grid);
        setFinder(new PF.AStarFinder());

    }, [mapLoaded]);

    const findPath = (start: Position, end: Position) => {
        if (grid && finder) {
            const path = finder.findPath(0, 0, 4, 6, grid.clone());
            console.log(path);
        }

    };
    return { findPath };
}