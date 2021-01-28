import { Position, ZoneRouteType } from '../../types';
import { ZoneName, loadZoneData } from '../../utils/load-zone-data';
import useAddVisitedZone from '../use-add-visited-zone';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../components/redux-state/store';
import { LoadFreshZone, LoadVisitedZone } from '../../components/redux-state/reducers/zone/actions';


export default function useLoadZone() {
    const { addVisitedZone } = useAddVisitedZone();
    const visitedZones = useSelector((state: RootState) => state.zone.visitedZones);
    const dispatch = useDispatch();

    const loadFreshZone = (zoneName: ZoneName, playerPosition?: Position) => {
        dispatch(LoadFreshZone(zoneName, playerPosition));
    };

    const loadVisitedZone = (zoneName: ZoneName, playerPosition?: Position) => {
        dispatch(LoadVisitedZone(zoneName, playerPosition));
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


