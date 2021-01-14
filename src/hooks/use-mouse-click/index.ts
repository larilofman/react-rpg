import { useEffect, useState } from "react";
import { Position } from '../../types';
import { useStateValue } from '../../components/state';

export default function useMouseClick() {
    const [tileClicked, setTileClicked] = useState<Position | undefined>(undefined);
    const [zone, setZone] = useState<HTMLElement | null>(document.getElementById('zone-container'));
    const [{ tileSize }] = useStateValue();
    useEffect(() => {
        if (!zone) {
            setZone(document.getElementById("zone-container"));
            console.log('??');
        }
        if (zone) {
            zone.addEventListener("click", onClick);
            return () => zone.removeEventListener("click", onClick);
        }
    });

    const onClick = (e: MouseEvent) => {
        // TODO: Take into account the camera position to get the actual clicked tile, not the one relative to camera
        if (zone) {
            const borderLeft = getComputedStyle(zone, null).getPropertyValue('border-left-width').replace(/\D/g, "") as unknown as number;
            const borderTop = getComputedStyle(zone, null).getPropertyValue('border-top-width').replace(/\D/g, "") as unknown as number;

            const clickX = Math.floor((e.clientX - zone.offsetLeft - borderLeft) / tileSize.w);
            const clickY = Math.floor((e.clientY - zone.offsetTop - borderTop) / tileSize.h);
            setTileClicked({ x: clickX, y: clickY });

        }
    };

    return { tileClicked };
}