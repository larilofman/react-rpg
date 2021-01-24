import { ZoneData, ZoneRoute } from '../../../types';
import { useStateValue, ActionType } from '../index';
import { ZoneName } from '../../../utils/load-zone-data';

export default function useLoadZone() {
    const [{ visitedZones }, dispatch] = useStateValue();

    const loadFreshZone = (mapName: ZoneName) => {
        dispatch(
            {
                type: ActionType.LOAD_FRESH_ZONE,
                payload: mapName
            });
    };

    const loadVisitedZone = (mapName: ZoneName) => {
        dispatch(
            {
                type: ActionType.LOAD_VISITED_ZONE,
                payload: mapName
            });
    };

    const loadZone = (zoneRoute: ZoneRoute) => {
        console.log(zoneRoute);
    };

    return {
        loadFreshZone, loadVisitedZone
    };
}


