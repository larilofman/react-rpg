import { BaseCreature, Position, Faction, InteractableTileType } from '../../types';
import useGetCreature from '../use-get-creature';
import useMelee from '../use-melee';
import { useStateValue } from '../../components/state';
import useLoadZone from '../../components/state/action-hooks/useLoadZone';

export default function useContact() {
    const [{ zoneData }] = useStateValue();
    const { changeZone } = useLoadZone();

    function interact(pos: Position) {
        const interactedTile = zoneData.interactableTiles.find(t => t.position.x === pos.x && t.position.y === pos.y);
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