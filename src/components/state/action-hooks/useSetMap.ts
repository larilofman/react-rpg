import { ZoneData } from '../../../types';
import { useStateValue, ActionType } from '../index';

export default function useSetMap() {
    const [, dispatch] = useStateValue();

    const setMap = (map: ZoneData) => {
        dispatch(
            {
                type: ActionType.SET_MAP,
                payload: map
            });
    };

    return {
        setMap
    };
}


