import { useStateValue } from '../../components/state';
import { Position, Creature } from '../../types';

export default function useGetCreature() {
    const [{ zoneData }] = useStateValue();

    const getCreatureById = (id: string) => {
        let creature: Creature | undefined;
        for (const faction of Object.values(zoneData.creatures)) {
            const c = faction.find(c => c.id === id);
            if (c) {
                creature = c;
            }
        }
        return creature;
    };

    const getContactingCreatures = (attackerId: string, targetPos: Position): { attacker: Creature | undefined, target: Creature | undefined } => {
        let attacker: Creature | undefined;
        let target: Creature | undefined;
        for (const faction of Object.values(zoneData.creatures)) {
            const foundAttacker = faction.find(c => c.id === attackerId);
            if (foundAttacker) {
                attacker = foundAttacker;
            }
            const foundTarget = faction.find(c => (c.pos.x === targetPos.x && c.pos.y === targetPos.y));
            if (foundTarget) {
                target = foundTarget;
            }
        }
        return { attacker, target };
    };

    const getCreatureByPos = (pos: Position) => {
        let creature: Creature | undefined;
        for (const faction of Object.values(zoneData.creatures)) {
            const c = faction.find(c => (c.pos.x === pos.x && c.pos.y === pos.y));
            if (c) {
                creature = c;
            }
        }
        return creature;
    };

    return { getCreatureById, getCreatureByPos, getContactingCreatures };
}