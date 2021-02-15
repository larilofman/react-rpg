import { useEffect, useState } from "react";
import throttle from 'lodash.throttle';
import { turnDelay } from '../../data/settings/general';


export default function useKeyPress() {
    const [keyPressed, setKeyPressed] = useState<string>();

    // Add a little delay so only one keypress is registered per turn, turnDelay halved seemed to do the trick.
    const throttledSetter = throttle((key: string | undefined) => setKeyPressed(key), turnDelay / 2);

    const processKey = (e: KeyboardEvent) => {
        if (e.type === "keyup") {
            throttledSetter(undefined);
        } else {
            throttledSetter(e.code);
        }


    };
    useEffect(() => {
        window.addEventListener("keydown", processKey);
        return () => window.removeEventListener("keydown", processKey);
    });
    useEffect(() => {
        window.addEventListener("keyup", processKey);
        return () => window.removeEventListener("keyup", processKey);
    });

    return { keyPressed };
}