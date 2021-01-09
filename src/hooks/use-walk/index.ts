import { useState } from 'react';
import { Position, Direction } from '../../types';

export default function useWalk(animSteps = 1, speed = 0, startPos: Position = { x: 0, y: 0 }) {
    const [position, setPosition] = useState<Position>(startPos);
    const [dir, setDir] = useState<Direction>(0);
    const [step, setStep] = useState(0);

    function walk(dir: Direction | undefined) {
        if (dir !== undefined && dir in Direction) {
            console.log(dir);
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
        setPosition(newPos);
    }

    return {
        walk, dir, step, position
    };
}