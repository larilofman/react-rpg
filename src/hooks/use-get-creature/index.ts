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

    const getCreatureByPos = (pos: Position) => {
        let creature: Creature | undefined;
        for (const faction of Object.values(zoneData.creatures)) {
            const c = faction.find(c => c.pos === pos);
            if (c) {
                creature = c;
            }
        }
        return creature;
    };

    return { getCreatureById, getCreatureByPos };
}