import { useEffect, useState } from "react";
import { Position, Tile } from '../../types';
import { useStateValue } from '../../components/state';
import PF, { Grid } from 'pathfinding';
import useCheckCollision from '../use-check-collision';

export default function usePathfinding() {
    const [grid, setGrid] = useState<PF.Grid>();
    const [finder] = useState<PF.AStarFinder>(new PF.AStarFinder());
    const [path, setPath] = useState<Position[]>();
    const [pathExists, setPathExists] = useState(false);
    const [nextStep, setNextStep] = useState<Position>();
    const [destination, setDestination] = useState<Position>();
    const [{ mapLoaded, zoneData }] = useStateValue();
    const { isWalkable } = useCheckCollision();

    const [desiredPath, setDesiredPath] = useState<{ start: Position, end: Position }>();

    // useEffect(() => {
    //     if (mapLoaded) {
    //         setFinder();
    //     }
    // }, [mapLoaded]);

    const cancelPath = () => {
        // call from player to cancel walking
    };

    // const updateStep = () => {
    //     if (path) {

    //         // if next step on the path is walkable remove first tile from it and return
    //         // if tile still remains, return it
    //         if (isWalkable(path[0])) {
    //             if (path.length > 1) {
    //                 const newPath = path.slice(1);
    //                 setPath(newPath);
    //                 setNextStep(newPath[0]);
    //             } else {
    //                 setNextStep(path[1]);
    //                 setPath(undefined);
    //             }

    //         } else {
    //             createGrid();
    //         }           // if occupied or non passable get a new path from path[0] to destination
    //     }
    // };

    // riittääkö jos ennen joka askelta pelaaja tarkistaa onko tile occupied ja jos on niin tehdään uusi grid ja haetaan uusi reitti currentPos -> clickPos ?

    // const getNextStep = (start, end) => {
    //     setRequestPath(start, end)
    // }

    // useEffect(() => {
    //     if(requestStep){
    //         const grid = createGrid();
    //         const path = findPath();
    //         setNextStep(path[0])
    //     }
    // },[requestStep])

    useEffect(() => {
        if (desiredPath) {
            createGrid();
        }
    }, [desiredPath]);

    useEffect(() => {
        createPath();
    }, [grid]);

    useEffect(() => {
        if (pathExists) {
            updateStep();
        }
    }, [pathExists]);

    const updateStep = () => {
        if (path && path[0]) {
            if (isWalkable(path[0])) {
                if (path.length > 1) {
                    const nextTile = path[0];
                    const newPath = path.slice(1);
                    setPath(newPath);
                    setNextStep(nextTile);

                } else {
                    // only one step remaining
                    setNextStep(path[0]);
                    setDesiredPath(undefined);
                    setPath(undefined);
                    setPathExists(false);
                }
            } else {
                // get current position from previous nextStep
                console.log('not walkable, nextStep: ', nextStep);
                if (nextStep && desiredPath) {
                    setDesiredPath({ start: nextStep, end: desiredPath.end });
                }

            }
        } else {
            setNextStep(undefined);
        }
    };


    const findPath = (start: Position, end: Position) => {
        setDesiredPath({ start, end });
    };

    const createPath = () => {
        if (grid && finder && desiredPath) {
            const path = finder.findPath(desiredPath.start.x, desiredPath.start.y, desiredPath.end.x, desiredPath.end.y, grid.clone()).slice(1);
            const pathAsPos: Position[] = path.map(step => ({ x: step[0], y: step[1] }));
            setPath(pathAsPos);
            setPathExists(true);
        }
    };

    const createGrid = () => {
        const nodes = [];
        for (let y = 0; y < zoneData.tiles.length; y++) {
            const row = [];
            for (let x = 0; x < zoneData.tiles[y].length; x++) {
                if (!isWalkable(zoneData.tiles[y][x].position)) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            }
            nodes.push(row);
        }
        const newGrid = new Grid(nodes);
        setGrid(newGrid);
    };
    return { findPath, updateStep, nextStep };
}