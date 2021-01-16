import { useStateValue, ActionType } from '../index';
import { BaseCreature } from '../../../types';

export default function useRemoveCreature() {
    const [, dispatch] = useStateValue();

    const removeCreature = (creature: BaseCreature) => {
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