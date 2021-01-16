import { Creature, Position, Faction } from '../../types';
import useGetCreature from '../use-get-creature';
import useMelee from '../use-melee';

export default function useContact() {
    const { getCreatureByPos, getContactingCreatures } = useGetCreature();
    const { meleeAttack } = useMelee();

    function contact(actor: Creature, targetPos: Position) {
        // const target = getCreatureByPos(targetPos);
        const { attacker, target } = getContactingCreatures(actor.id, targetPos);

        if (attacker && target) {
            if (attacker.faction === Faction.Player) {
                switch (target.faction) {
                    case Faction.Hostile:
                        console.log('melee');
                        meleeAttack(attacker.id, target);
                        break;
                    case Faction.Friendly:
                        console.log('Bumped into friendly');
                        break;
                    default:
                        break;
                }
            } else {
                if (attacker.faction === target.faction) {
                    // Npc bumped into friendly
                    console.log('Npc bumped into one of its own');
                } else {
                    // TODO: Npc attack
                    console.log('Npc bumped into player');
                }
            }
        }
    }

    return {
        contact
    };
}