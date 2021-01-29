import { Position, InteractableTileType } from '../../types';
import useLoadZone from '../use-load-zone';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/redux-state/store';

export default function useInteract() {
    const interactableTiles = useSelector((state: RootState) => state.zone.zoneData.interactableTiles);
    const { changeZone } = useLoadZone();

    function interact(pos: Position) {
        const interactedTile = interactableTiles.find(t => t.position.x === pos.x && t.position.y === pos.y);
        switch (interactedTile?.type) {
            case InteractableTileType.ZoneRoute:
                changeZone(interactedTile);
                break;
            default:
                break;
        }
    }

    return {
        interact
    };
}