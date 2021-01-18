import { useEffect, useState } from "react";

export default function useKeyPress() {
    const [keyPressed, setKeyPressed] = useState<string>();

    const processKey = (e: KeyboardEvent) => {
        if (e.type === "keyup") {
            setKeyPressed(undefined);
        } else {
            setKeyPressed(e.key);
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

// export default function useKeyPress(fn: (e: KeyboardEvent) => void) {
//     useEffect(() => {
//         console.log('keypress')
//         window.addEventListener("keydown", fn);
//         return () => window.removeEventListener("keydown", fn);
//     }, [fn]);
// }