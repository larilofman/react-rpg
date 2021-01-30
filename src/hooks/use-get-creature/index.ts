import { Position, Creature } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/redux-state/store';

export default function useGetCreature() {
    const creatures = useSelector((state: RootState) => state.zone.zoneStatus.creatures);

    const getCreatureById = (id: string) => {
        let creature: Creature | undefined;
        for (const faction of Object.values(creatures)) {
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
        for (const faction of Object.values(creatures)) {
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
        for (const faction of Object.values(creatures)) {
            const c = faction.find(c => (c.pos.x === pos.x && c.pos.y === pos.y));
            if (c) {
                creature = c;
                break;
            }
        }
        return creature;
    };

    return { getCreatureById, getCreatureByPos, getContactingCreatures };
}