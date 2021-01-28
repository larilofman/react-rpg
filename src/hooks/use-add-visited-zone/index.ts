import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../components/redux-state/store';
import { SaveVisitedZone } from '../../components/redux-state/reducers/zone/actions';

export default function useAddVisitedZone() {
    const zoneData = useSelector((state: RootState) => state.zone.zoneData);
    const dispatch = useDispatch();

    const addVisitedZone = () => {
        const savedZoneData = {
            name: zoneData.name,
            creatures: zoneData.creatures,
            tiles: zoneData.tiles,
            size: zoneData.size,
            interactableTiles: zoneData.interactableTiles

        };
        dispatch(SaveVisitedZone(savedZoneData));
    };

    return {
        addVisitedZone
    };
}


