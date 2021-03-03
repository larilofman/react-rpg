import { useDispatch, useStore } from 'react-redux';
import { RootState } from '../../components/redux-state/store';
import { SavePlayer, LoadZone, SaveVisitedZone } from '../../components/redux-state/reducers/game/actions';
import { linkedRoutesById } from '../../data/zones';
import { Faction } from '../../types/creature';
import { ZoneRouteType } from '../../types/tile';

export default function useChangeZone() {
    const dispatch = useDispatch();
    const player = useStore<RootState>().getState().zone.creatures[Faction.Player][0];
    const zoneStatus = useStore<RootState>().getState().zone;

    const changeZone = (zoneRouteUsed: ZoneRouteType) => {
        const linkedRoute = linkedRoutesById[zoneRouteUsed.id];
        dispatch(SavePlayer({ ...player, pos: linkedRoute.position }));
        dispatch(SaveVisitedZone(zoneStatus));
        dispatch(LoadZone(linkedRoute.zoneName));
    };

    return {
        changeZone
    };
}
