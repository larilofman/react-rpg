import { MapData } from '../../../types';
import { useStateValue, ActionType } from '../index';

export default function useSetMap() {
    const [, dispatch] = useStateValue();

    const setMap = (map: MapData) => {
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


