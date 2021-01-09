import { useState } from 'react';

export default function useWalk(animSteps = 1, speed = 0, startPos = { x: 0, y: 0 }) {
    const [position, setPosition] = useState(startPos);
    const [dir, setDir] = useState(0);
    const [step, setStep] = useState(0);
    const directions = {
        down: 0,
        left: 1,
        right: 2,
        up: 3
    };

    const modifier = {
        down: { x: 0, y: speed },
        left: { x: -speed, y: 0 },
        right: { x: speed, y: 0 },
        up: { x: 0, y: -speed },
    };

    // function walk(dir) {
    //     setDir(prev => {
    //         if (directions[dir] === prev) move(dir);
    //         return directions[dir]
    //     })
    //     setStep(prev => prev < animSteps - 1 ? prev + 1 : 0);
    // }

    function walk(dir) {
        if (dir in directions) {
            setDir(directions[dir]);
            setStep(prev => prev < animSteps - 1 ? prev + 1 : 0);
            move(dir);
        }
    }

    function move(dir) {
        setPosition((prev) => ({
            x: prev.x + modifier[dir].x,
            y: prev.y + modifier[dir].y,
        }));
    }

    return {
        walk, dir, step, position
    };
}