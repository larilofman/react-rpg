import { Position, Creature } from '../../../types';
import { useStateValue, ActionType } from '../index';

export default function useMoveCreature() {
    const [, dispatch] = useStateValue();

    const moveCreature = (creature: Creature, oldPos: Position) => {
        dispatch(
            {
                type: ActionType.MOVE_CREATURE,
                payload: { creature, oldPos }
            });
    };

    return {
        moveCreature
    };
}


