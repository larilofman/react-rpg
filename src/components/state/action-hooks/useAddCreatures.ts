import { ZoneData, Faction, Tile, Position, Creature } from '../../../types';
import { useStateValue, ActionType } from '../index';

export default function useAddCreatures() {
    const [, dispatch] = useStateValue();

    const addCreatures = (creatures: Creature[]) => {
        dispatch(
            {
                type: ActionType.ADD_CREATURES,
                payload: creatures
            });
    };

    return {
        addCreatures
    };
}


