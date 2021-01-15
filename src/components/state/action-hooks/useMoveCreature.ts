import { Position, ReducedCreature } from '../../../types';
import { useStateValue, ActionType } from '../index';

export default function useMoveCreature() {
    const [, dispatch] = useStateValue();

    const moveCreature = (creature: ReducedCreature) => {
        dispatch(
            {
                type: ActionType.MOVE_CREATURE,
                payload: creature
            });
    };

    return {
        moveCreature
    };
}


