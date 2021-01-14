import { Creature, Attack } from '../../types';
import useDamageCreature from '../../components/state/action-hooks/useDamageCreature';
import useGetCreature from '../use-get-creature';

export default function useUseContact() {
    const { damageCreature } = useDamageCreature();
    const { getCreatureById } = useGetCreature();

    function meleeAttack(actor: Creature, targetId: string) {
        // if (newPos.occupant) {
        //     const attack: Attack = {
        //         type: DamageType.Physical,
        //         damage: 5
        //     };
        //     meleeAttack(newPos.occupant, attack);
        // } else {
        //     if (newPos.passable) {
        //         const newCreature: Creature = {
        //             ...creature,
        //             pos: newPos.position
        //         };
        //         moveCreature(newCreature, position);
        //         setCreature(newCreature);
        //         walk(newPos);
        //     }
        // }
        // damageCreature(targetId, attack, attacker);
    }

    return {
        meleeAttack
    };
}