import { useEffect, useState } from "react";
import { Position } from '../../types';
import useGetTiles from '../use-get-tiles';
import useGetCreature from '../use-get-creature';
import settings from '../../data/settings/general.json';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/redux-state/store';


export default function useMouseClick() {
    const cameraPosition = useSelector((state: RootState) => state.cameraPosition);
    const [creatureClicked, setCreatureClicked] = useState<string>();
    const [posClicked, setPosClicked] = useState<Position | undefined>(undefined);
    const [zone, setZone] = useState<HTMLElement | null>(document.getElementById('zone-container'));
    const { getTileAt } = useGetTiles();
    const { getCreatureByPos } = useGetCreature();
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
            const clickX = Math.floor(((e.clientX - zone.offsetLeft - borderLeft) / settings.tileSize.w)) + cameraPosition.x;
            const clickY = Math.floor(((e.clientY - zone.offsetTop - borderTop) / settings.tileSize.h)) + cameraPosition.y;

            // If click happens on a tile
            if (getTileAt({ x: clickX, y: clickY })) {
                setPosClicked({ x: clickX, y: clickY });

                const creature = getCreatureByPos({ x: clickX, y: clickY });
                if (creature) {
                    setCreatureClicked(creature.id);
                } else {
                    setCreatureClicked(undefined);
                }
            }

        }
    };

    return { creatureClicked, posClicked };
}