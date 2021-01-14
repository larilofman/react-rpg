import { useStateValue, ActionType } from '../index';
import { Creature, Attack } from '../../../types';
import useRemoveCreature from './useRemoveCreature';
import useGetCreature from '../../../hooks/use-get-creature';

export default function useDamageCreature() {
    const [, dispatch] = useStateValue();
    const { removeCreature } = useRemoveCreature();
    const { getCreatureById } = useGetCreature();

    const damageCreature = (attackerId: string, target: Creature) => {
        const attacker = getCreatureById(attackerId);

        if (target && attacker) {
            const healthRemaining = target.stats.health - attacker.stats.damage;
            if (healthRemaining > 0) {
                target = {
                    ...target,
                    stats: {
                        ...target.stats,
                        health: healthRemaining
                    }
                };
                dispatch(
                    {
                        type: ActionType.DAMAGE_CREATURE,
                        payload: target
                    });
            } else {
                removeCreature(target);
            }
        }


    };
    return {
        damageCreature
    };

}