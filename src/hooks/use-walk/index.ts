import { useState, useEffect } from 'react';
import { Position, Direction } from '../../types';
import useCheckCollision from '../use-check-collision';
import { useStateValue } from '../../components/state';
import useFindRandomFloorTile from '../use-find-floor-tile';

export default function useWalk(animSteps = 1, speed = 0, startPos?: Position, collides = true) {
    const [{ mapLoaded }] = useStateValue();
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [dir, setDir] = useState<Direction>(0);
    const [step, setStep] = useState(0);
    const { checkCollision } = useCheckCollision();
    const { findFloorTile } = useFindRandomFloorTile();

    useEffect(() => {
        if (mapLoaded && !startPos) {
            const tile = findFloorTile();
            setPosition(tile.position);
        }

    }, [mapLoaded]);

    function walk(dir: Direction) {
        if (dir !== undefined && dir in Direction) {
            setDir(dir);
            setStep(prev => prev < animSteps - 1 ? prev + 1 : 0);
            move(dir);
        }
    }

    function move(dir: Direction) {
        let newPos = position;

        switch (dir) {
            case Direction.down:
                newPos = { x: position.x, y: position.y + speed };
                break;
            case Direction.up:
                newPos = { x: position.x, y: position.y - speed };
                break;
            case Direction.left:
                newPos = { x: position.x - speed, y: position.y };
                break;
            case Direction.right:
                newPos = { x: position.x + speed, y: position.y };
                break;
            default:
                break;
        }
        if (!collides || (collides && checkCollision(newPos)))
            setPosition(newPos);
    }

    return {
        walk, dir, step, position
    };
}