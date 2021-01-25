import { Position, ZoneRouteType } from '../../../types';
import { useStateValue, ActionType } from '../index';
import { ZoneName, loadZoneData } from '../../../utils/load-zone-data';
import useAddVisitedZone from '../action-hooks/useAddVisitedZone';

export default function useLoadZone() {
    const [{ visitedZones }, dispatch] = useStateValue();
    const { addVisitedZone } = useAddVisitedZone();

    const loadFreshZone = (zoneName: ZoneName, playerPosition?: Position) => {
        dispatch(
            {
                type: ActionType.LOAD_FRESH_ZONE,
                payload: { zoneName, playerPosition }
            });
    };

    const loadVisitedZone = (zoneName: ZoneName, playerPosition?: Position) => {
        dispatch(
            {
                type: ActionType.LOAD_VISITED_ZONE,
                payload: { zoneName, playerPosition }
            });
    };

    const changeZone = (zoneRoute: ZoneRouteType) => {
        addVisitedZone();
        const zoneToLoad = visitedZones.find(z => z.name === zoneRoute.linkedRoute.zone);
        const linkedRoute = loadZoneData(zoneRoute.linkedRoute.zone).zoneRoutes.find(route => route.id === zoneRoute.linkedRoute.id);
        if (zoneToLoad) {
            loadVisitedZone(zoneRoute.linkedRoute.zone, linkedRoute?.position);
        } else {
            loadFreshZone(zoneRoute.linkedRoute.zone, linkedRoute?.position);
        }
    };

    return {
        loadFreshZone, loadVisitedZone, changeZone
    };
}


