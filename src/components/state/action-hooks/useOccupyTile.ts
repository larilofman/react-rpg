import { ZoneData, Faction, Tile, Position, Creature } from '../../../types';
import { useStateValue, ActionType } from '../index';

export default function useOccupyTile() {
    const [, dispatch] = useStateValue();

    const occupyTile = (creature: Creature, oldPos: Position) => {
        dispatch(
            {
                type: ActionType.OCCUPY_TILE,
                payload: { creature, oldPos }
            });
    };

    return {
        occupyTile
    };
}


