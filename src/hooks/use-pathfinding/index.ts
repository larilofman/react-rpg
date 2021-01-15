import { useEffect, useState } from "react";
import { Position, Tile } from '../../types';
import { useStateValue } from '../../components/state';
import PF, { Grid } from 'pathfinding';

export default function usePathfinding() {
    const [grid, setGrid] = useState<PF.Grid>();
    const [finder, setFinder] = useState<PF.AStarFinder>();
    const [path, setPath] = useState<Position[]>();
    const [nextStep, setNextStep] = useState<Position>();
    const [{ mapLoaded, zoneData }] = useStateValue();

    useEffect(() => {
        if (mapLoaded) {
            setFinder(new PF.AStarFinder());
            createGrid();
        }
    }, [mapLoaded]);

    useEffect(() => {
        if (mapLoaded) {
            createGrid();
        }

    }, [zoneData]);

    const cancelPath = () => {
        // call from player to cancel walking
    };

    const updateStep = () => {
        if (path) {
            const newPath = path.slice(1);
            setPath(newPath);
            setNextStep(newPath[0]);
        }
    };

    const findPath = (start: Position, end: Position) => {
        if (grid && finder) {
            const path = finder.findPath(start.x, start.y, end.x, end.y, grid.clone()).slice(1);
            const pathAsPos: Position[] = path.map(step => ({ x: step[0], y: step[1] }));
            // console.log(pathAsPos);
            setPath(pathAsPos);
            setNextStep(pathAsPos[0]);
        }
    };

    const createGrid = () => {
        const nodes = [];
        for (let y = 0; y < zoneData.tiles.length; y++) {
            const row = [];
            for (let x = 0; x < zoneData.tiles[y].length; x++) {
                if (!zoneData.tiles[y][x].passable || zoneData.tiles[y][x].occupant) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            }
            nodes.push(row);
        }
        const newGrid = new Grid(nodes);
        setGrid(newGrid);
        return newGrid;
    };
    return { findPath, updateStep, nextStep };
}