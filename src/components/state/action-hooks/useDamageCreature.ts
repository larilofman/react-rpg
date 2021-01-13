import { useStateValue, ActionType } from '../index';
import { Attack, Creature } from '../../../types';
import useRemoveCreature from './useRemoveCreature';

export default function useDamageCreature() {
    const [{ zoneData }, dispatch] = useStateValue();
    const { removeCreature } = useRemoveCreature();

    const damageCreature = (target: Creature, attack: Attack, attacker: Creature) => {
        let damagedCreature = zoneData.creatures[target.faction].find(c => c.id === target.id);

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