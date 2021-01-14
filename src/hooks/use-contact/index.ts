import { Creature, Attack, ReducedCreature, Faction } from '../../types';
import useDamageCreature from '../../components/state/action-hooks/useDamageCreature';
import useGetCreature from '../use-get-creature';
import useMelee from '../use-melee';

export default function useContact() {
    const { damageCreature } = useDamageCreature();
    const { getCreatureById } = useGetCreature();
    const { meleeAttack } = useMelee();

    function contact(actor: ReducedCreature, targetId: string) {
        const target = getCreatureById(targetId);

        if (target) {
            if (actor.faction === Faction.Player) {
                switch (target.faction) {
                    case Faction.Hostile:
                        meleeAttack(actor.id, target);
                        break;
                    case Faction.Friendly:
                        console.log('Bumped into friendly');
                        break;
                    default:
                        break;
                }
            } else {
                if (actor.faction === target.faction) {
                    // Npc bumped into friendly
                    console.log('Enemy bumped into another enemy');
                } else {
                    // TODO: Npc attack
                    console.log('Npc bumped into player');
                }
            }
        }


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
        contact
    };
}