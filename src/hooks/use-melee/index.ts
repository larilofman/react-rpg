import { Creature } from '../../types';
import useDamageCreature from '../../components/state/action-hooks/useDamageCreature';
import useGetCreature from '../use-get-creature';
import UseCombatLog, { CombatLogEntryType, CombatLogEntry } from '../use-combat-log';

export default function useMelee() {
    const { getCreatureById } = useGetCreature();
    const { damageCreature } = useDamageCreature();
    const { AddEntry } = UseCombatLog();

    function meleeAttack(attackerId: string, target: Creature) {
        const attacker = getCreatureById(attackerId);

        damageCreature(attackerId, target);

        if (target && attacker) {
            const entryDamaged: CombatLogEntry = { type: CombatLogEntryType.Damaged, data: { attacker, target, damage: attacker.stats.damage } };
            const healthRemaining = target.stats.health - attacker.stats.damage;
            AddEntry(entryDamaged);
            if (healthRemaining <= 0) {
                const entryDied: CombatLogEntry = { type: CombatLogEntryType.Died, data: { creature: target } };
                AddEntry(entryDied);
            }
        }
    }

    return {
        meleeAttack
    };

}

