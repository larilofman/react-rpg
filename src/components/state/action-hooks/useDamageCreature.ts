import { useStateValue, ActionType } from '../index';
import { Creature } from '../../../types';
import useRemoveCreature from './useRemoveCreature';
import useGetCreature from '../../../hooks/use-get-creature';
import UseCombatLog, { CombatLogEntryType, CombatLogEntryDamaged, CombatLogEntryDied } from './combatLog';

export default function useDamageCreature() {
    const [, dispatch] = useStateValue();
    const { removeCreature } = useRemoveCreature();
    const { getCreatureById } = useGetCreature();
    const { AddEntry } = UseCombatLog();

    const damageCreature = (attackerId: string, target: Creature) => {
        const attacker = getCreatureById(attackerId);

        if (target && attacker) {
            const healthRemaining = target.stats.health - attacker.stats.damage;

            const entryDamaged = { type: CombatLogEntryType.Damaged, data: { attacker, target, damage: attacker.stats.damage } } as CombatLogEntryDamaged;
            AddEntry(entryDamaged);

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
                const entryDied = { type: CombatLogEntryType.Died, data: { creature: target } } as CombatLogEntryDied;
                AddEntry(entryDied);
            }
        }
    };
    return {
        damageCreature
    };

}