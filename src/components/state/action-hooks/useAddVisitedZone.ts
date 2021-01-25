import { useStateValue, ActionType } from '../index';

export default function useAddVisitedZone() {
    const [{ zoneData }, dispatch] = useStateValue();

    const addVisitedZone = () => {
        const savedZoneData = {
            name: zoneData.name,
            creatures: zoneData.creatures,
            tiles: zoneData.tiles,
            size: zoneData.size,
            interactableTiles: zoneData.interactableTiles

        };
        dispatch(
            {
                type: ActionType.SAVE_VISITED_ZONE,
                payload: savedZoneData
            });
    };

    return {
        addVisitedZone
    };
}


