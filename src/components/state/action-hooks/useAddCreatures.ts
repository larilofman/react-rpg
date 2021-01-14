import { Faction, Creature } from '../../../types';
import { useStateValue, ActionType } from '../index';

export default function useAddCreatures() {
    const [, dispatch] = useStateValue();

    const addCreatures = (creatures: Creature[], faction: Faction) => {
        dispatch(
            {
                type: ActionType.ADD_CREATURES,
                payload: { creatures, faction }
            });
    };

    return {
        addCreatures
    };
}


