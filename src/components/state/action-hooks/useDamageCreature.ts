import { useStateValue, ActionType } from '../index';
import { Creature } from '../../../types';
import useRemoveCreature from './useRemoveCreature';
import useGetCreature from '../../../hooks/use-get-creature';
import UseCombatLog, { CombatLogEntryType, CombatLogEntryDamaged, CombatLogEntryDied } from './useCombatLog';
import { useDispatch, useSelector } from 'react-redux';
import useAddEntry from '../../redux-state/dispatcher-hooks/useCombatLog';

export default function useDamageCreature() {
    const [, dispatch] = useStateValue();
    const { removeCreature } = useRemoveCreature();
    const { getCreatureById } = useGetCreature();
    // const { AddEntry } = UseCombatLog();
    const { AddEntry } = useAddEntry();

    const damageCreature = (attackerId: string, target: Creature) => {
        const attacker = getCreatureById(attackerId);

        if (target && attacker) {
            const healthRemaining = target.stats.health - attacker.stats.damage;

            const entryDamaged = { type: CombatLogEntryType.Damaged, data: { attacker, target, damage: attacker.stats.damage } } as CombatLogEntryDamaged;
            // AddEntry(entryDamaged);
            // dispatch2(addEntry(`${attacker.name} hit ${target.name} for ${attacker.stats.damage} damage`));
            AddEntry(`${attacker.name} hits ${target.name} for ${attacker.stats.damage} damage`);

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
                // const entryDied = { type: CombatLogEntryType.Died, data: { creature: target } } as CombatLogEntryDied;
                // AddEntry(entryDied);
                AddEntry(`${target.name} dies.`);
            }
        }
    };
    return {
        damageCreature
    };

}