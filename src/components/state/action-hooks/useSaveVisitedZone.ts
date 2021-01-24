import { ZoneData } from '../../../types';
import { useStateValue, ActionType } from '../index';
import { ZoneName } from '../../../utils/load-zone-data';

export default function useSaveVisitedZone() {
    const [, dispatch] = useStateValue();

    const saveVisitedZone = (zone: ZoneData) => {
        dispatch(
            {
                type: ActionType.SAVE_VISITED_ZONE,
                payload: zone
            });
    };

    return {
        saveVisitedZone
    };
}


