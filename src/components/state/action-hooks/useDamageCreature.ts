import { useStateValue, ActionType } from '../index';
import { Attack, Creature } from '../../../types';
import useRemoveCreature from './useRemoveCreature';
import useGetCreature from '../../../hooks/use-get-creature';

export default function useDamageCreature() {
    const [{ zoneData }, dispatch] = useStateValue();
    const { removeCreature } = useRemoveCreature();
    const { getCreatureById } = useGetCreature();

    const damageCreature = (targetId: string, attack: Attack, attacker: Creature) => {
        let damagedCreature = getCreatureById(targetId);

        if (damagedCreature) {
            const healthRemaining = damagedCreature.stats.health - attack.damage;
            if (healthRemaining > 0) {
                damagedCreature = {
                    ...damagedCreature,
                    stats: {
                        ...damagedCreature.stats,
                        health: healthRemaining
                    }
                };
                dispatch(
                    {
                        type: ActionType.DAMAGE_CREATURE,
                        payload: damagedCreature
                    });
            } else {
                removeCreature(damagedCreature);
            }
        }


    };
    return {
        damageCreature
    };

}