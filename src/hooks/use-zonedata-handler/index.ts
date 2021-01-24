import { ZoneData } from '../../types';
import { useStateValue, ActionType } from '../../components/state/index';
import { ZoneName } from '../../utils/load-zone-data';
import useSaveVisitedZone from '../../components/state/action-hooks/useSaveVisitedZone';

export default function useZoneDataHandler() {
    const [{ combatLog, zoneData, visitedZones }, dispatch] = useStateValue();
    const { saveVisitedZone } = useSaveVisitedZone();

    const saveZoneData = () => {
        const savedZoneData = {
            name: zoneData.name,
            creatures: zoneData.creatures,
            tiles: zoneData.tiles,
            size: zoneData.size

        };
        saveVisitedZone(savedZoneData);
    };

    const loadVisitedZone = (name: ZoneName) => {
        const zoneToLoad = visitedZones.find(z => z.name === name);
    };

    return {
        saveZoneData
    };
}


