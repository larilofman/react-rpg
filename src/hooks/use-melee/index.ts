import { Creature } from '../../types';
import useDamageCreature from '../../components/state/action-hooks/useDamageCreature';

export default function useMelee() {
    const { damageCreature } = useDamageCreature();

    function meleeAttack(attackerId: string, target: Creature) {
        damageCreature(attackerId, target);
    }

    return {
        meleeAttack
    };
}