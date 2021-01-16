import { BaseCreature, Position, Faction } from '../../types';
import useGetCreature from '../use-get-creature';
import useMelee from '../use-melee';

export default function useContact() {
    const { getCreatureByPos } = useGetCreature();
    const { meleeAttack } = useMelee();

    function contact(actor: BaseCreature, targetPos: Position) {
        const target = getCreatureByPos(targetPos);
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