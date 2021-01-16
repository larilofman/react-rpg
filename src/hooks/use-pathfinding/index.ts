import { useState } from "react";
import { Position, TileStatus } from '../../types';
import { useStateValue } from '../../components/state';
import PF, { Grid } from 'pathfinding';
import usegetTileInDirection from '../use-get-tile';

export default function usePathfinding() {
    const [finder] = useState<PF.AStarFinder>(new PF.AStarFinder());
    const [{ zoneData }] = useStateValue();
    const { getTileStatus } = usegetTileInDirection();
    const [onRoute, setOnRoute] = useState(false);

    const cancelPath = () => {
        setOnRoute(false);
    };

    const findPath = (start: Position, end: Position) => {
        setOnRoute(true);
        const grid = createGrid();
        const path = createPath(start, end, grid);
        if (path && path.length) {
            return path[0];
        } else {
            setOnRoute(false);
        }
    };

    const createPath = (start: Position, end: Position, grid: PF.Grid) => {
        const path = finder.findPath(start.x, start.y, end.x, end.y, grid).slice(1);
        if (path.length) {
            const pathAsPos: Position[] = path.map(step => ({ x: step[0], y: step[1] }));
            return pathAsPos;
        }
    };

    const createGrid = () => {
        const nodes = [];
        for (let y = 0; y < zoneData.tiles.length; y++) {
            const row = [];
            for (let x = 0; x < zoneData.tiles[y].length; x++) {
                const tilePos = zoneData.tiles[y][x].position;
                if (getTileStatus(tilePos) === TileStatus.NonPassable || getTileStatus(tilePos) === TileStatus.Occupied) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            }
            nodes.push(row);
        }
        const newGrid = new Grid(nodes);
        return newGrid;
    };
    return { findPath, onRoute, cancelPath };
}