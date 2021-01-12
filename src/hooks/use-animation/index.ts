import { useState } from 'react';
import { Direction } from '../../types';

export default function useAnimation(animSteps = 3) {

    const [dir, setDir] = useState<Direction>(0);
    const [step, setStep] = useState(0);

    const setAnimState = (dir: Direction) => {
        setDir(dir);
        setStep(prev => prev < animSteps - 1 ? prev + 1 : 0);
    };

    return {
        dir, step, setAnimState
    };
}