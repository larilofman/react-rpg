import { BaseCreature, Position } from '../../../types';
import { useStateValue, ActionType } from '../index';

export default function useMoveCreature() {
    const [, dispatch] = useStateValue();

    const moveCreature = (creature: BaseCreature, pos: Position) => {
        dispatch(
            {
                type: ActionType.MOVE_CREATURE,
                payload: { creature, pos }
            });
    };

    return {
        moveCreature
    };
}


