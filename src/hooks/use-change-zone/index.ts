import { ZoneStatus, ZoneRouteType, Faction } from '../../types';
import { useDispatch, useStore } from 'react-redux';
import { RootState } from '../../components/redux-state/store';
import { LoadZone, SaveVisitedZone } from '../../components/redux-state/reducers/zone/actions';
import { SavePlayer } from '../../components/redux-state/reducers/game/actions';

export default function useChangeZone() {
    const dispatch = useDispatch();
    const player = useStore<RootState>().getState().zone.creatures[Faction.Player][0];
    const zoneStatus = useStore<RootState>().getState().zone;

    const changeZone = (zoneRouteUsed: ZoneRouteType) => {
        dispatch(SavePlayer({ ...player, pos: zoneRouteUsed.linkedRoute.position }));
        dispatch(SaveVisitedZone(zoneStatus));
        dispatch(LoadZone(zoneRouteUsed.linkedRoute.zoneName));
    };

    return {
        changeZone
    };
}
