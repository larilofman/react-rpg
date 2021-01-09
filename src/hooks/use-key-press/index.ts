import { useEffect } from "react";

export default function useKeyPress(fn: (e: KeyboardEvent) => void) {
    useEffect(() => {
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, [fn]);
}