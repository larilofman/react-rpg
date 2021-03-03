import useGetCreature from '../use-get-creature';
import useDamageCreature from '../use-damage-creature';
import { BaseCreature, Faction } from '../../types/creature';
import { Position } from '../../types/general';

export default function useContact() {
    const { getCreatureByPos } = useGetCreature();
    const { damageCreature } = useDamageCreature();

    function contact(actor: BaseCreature, targetPos: Position) {

        const target = getCreatureByPos(targetPos);
        if (target) {
            if (actor.faction === Faction.Player) {
                switch (target.faction) {
                    case Faction.Hostile:
                        damageCreature(actor.id, target);
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
                    // console.log('Npc bumped into player ', target);
                    damageCreature(actor.id, target);
                }
            }
        }
    }

    return {
        contact
    };
}