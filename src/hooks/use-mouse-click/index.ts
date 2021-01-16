import { useEffect, useState } from "react";
import { Position } from '../../types';
import { useStateValue } from '../../components/state';
import usegetTileInDirection from '../../hooks/use-check-collision';

export default function useMouseClick() {
    const [posClicked, setPosClicked] = useState<Position | undefined>(undefined);
    const [zone, setZone] = useState<HTMLElement | null>(document.getElementById('zone-container'));
    const [{ tileSize, cameraPosition }] = useStateValue();
    const { getTileAt } = usegetTileInDirection();
    useEffect(() => {
        if (!zone) {
            setZone(document.getElementById("zone-container"));
        }
        if (zone) {
            zone.addEventListener("click", onClick);
            return () => zone.removeEventListener("click", onClick);
        }
    });

    const onClick = (e: MouseEvent) => {
        if (zone) {
            const borderLeft = getComputedStyle(zone, null).getPropertyValue('border-left-width').replace(/\D/g, "") as unknown as number;
            const borderTop = getComputedStyle(zone, null).getPropertyValue('border-top-width').replace(/\D/g, "") as unknown as number;

            // Get click on viewport -> subtract display element's offset and the border -> divide by tileSize -> floor down -> add camera's position
            const clickX = Math.floor(((e.clientX - zone.offsetLeft - borderLeft) / tileSize.w)) + cameraPosition.x;
            const clickY = Math.floor(((e.clientY - zone.offsetTop - borderTop) / tileSize.h)) + cameraPosition.y;

            // If click happens on a tile
            if (getTileAt({ x: clickX, y: clickY })) {
                setPosClicked({ x: clickX, y: clickY });
            }

        }
    };

    return { posClicked };
}