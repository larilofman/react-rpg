import { useStateValue, ActionType } from '../index';
import { Attack, Creature } from '../../../types';

export default function useAttackCreature() {
    const [, dispatch] = useStateValue();

    const attackCreature = (target: Creature, attack: Attack, attacker: Creature) => {
        dispatch(
            {
                type: ActionType.ATTACK_CREATURE,
                payload: { target, attack, attacker }
            });
    };
    return {
        attackCreature
    };

}