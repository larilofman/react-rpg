import { Creature, Attack } from '../../types';
import useDamageCreature from '../../components/state/action-hooks/useDamageCreature';

export default function useMelee(attacker: Creature) {
    const { damageCreature } = useDamageCreature();

    function meleeAttack(targetId: string, attack: Attack) {
        damageCreature(targetId, attack, attacker);
    }

    return {
        meleeAttack
    };
}