import { ZoneData } from '../../../types';
import { useStateValue, ActionType } from '../index';
import { ZoneName } from '../../../utils/load-zone-data';

export default function useLoadZone() {
    const [, dispatch] = useStateValue();

    const loadFreshZone = (mapName: ZoneName) => {
        dispatch(
            {
                type: ActionType.LOAD_FRESH_ZONE,
                payload: mapName
            });
    };

    return {
        loadFreshZone
    };
}


