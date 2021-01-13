import { useStateValue, ActionType } from '../index';
import { Creature } from '../../../types';

export default function useRemoveCreature() {
    const [, dispatch] = useStateValue();

    const removeCreature = (creature: Creature) => {
        dispatch(
            {
                type: ActionType.REMOVE_CREATURE,
                payload: creature
            });

    };
    return {
        removeCreature
    };

}