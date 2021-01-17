import { useState } from 'react';
import { Direction, Position } from '../../types';

export default function useAnimation(animSteps = 3) {

    const [dir, setDir] = useState<Direction>(0);
    const [step, setStep] = useState(0);

    const setAnimState = (oldPos: Position, newPos: Position, updateStep = true) => {
        const xDir = newPos.x - oldPos.x;
        const yDir = newPos.y - oldPos.y;
        let dir = Direction.down;
        if (xDir === 1) {
            dir = Direction.right;
        } else if (xDir === -1) {
            dir = Direction.left;
        } else if (yDir === -1) {
            dir = Direction.up;
        }
        setDir(dir);
        if (updateStep) {
            setStep(prev => prev < animSteps - 1 ? prev + 1 : 0);
        }

    };

    return {
        dir, step, setAnimState
    };
}