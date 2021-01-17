import { useState } from "react";
import { Position, TileStatus } from '../../types';
import { useStateValue } from '../../components/state';
import PF, { Grid } from 'pathfinding';
import usegetTileInDirection from '../use-get-tile';
import Tile from "../../components/tile";

export default function usePathfinding() {
    const [finder] = useState<PF.AStarFinder>(new PF.AStarFinder());
    const [{ zoneData }] = useStateValue();
    const { getTileStatus } = usegetTileInDirection();
    const [onRoute, setOnRoute] = useState(false);

    const cancelPath = () => {
        setOnRoute(false);
    };

    const findPath = (start: Position, end: Position, gridArg?: PF.Grid): Position | null => {
        setOnRoute(true);
        const grid = gridArg ? gridArg : createGrid();
        const path = createPath(start, end, grid);
        if (path && path.length) {
            if (getTileStatus(path[0]) === TileStatus.Occupied) {
                const clone = grid.clone();
                clone.setWalkableAt(path[0].x, path[0].y, false);
                return findPath(start, end, clone);
            }
            return path[0];
        } else {
            setOnRoute(false);
            return null;
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
                if (getTileStatus(tilePos) === TileStatus.NonPassable) {
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