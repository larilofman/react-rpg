import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../components/redux-state/store';
import { SaveVisitedZone } from '../../components/redux-state/reducers/zone/actions';

export default function useAddVisitedZone() {
    const zoneStatus = useSelector((state: RootState) => state.zone.zoneStatus);
    const dispatch = useDispatch();

    const addVisitedZone = () => {
        const savedZoneData = {
            name: zoneStatus.name,
            creatures: zoneStatus.creatures,
            tiles: zoneStatus.tiles,
            size: zoneStatus.size,
            interactableTiles: zoneStatus.interactableTiles

        };
        dispatch(SaveVisitedZone(savedZoneData));
    };

    return {
        addVisitedZone
    };
}


