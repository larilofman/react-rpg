import { Tile } from '../../types';
import { useStateValue } from '../../components/state';

export default function useGetCreature() {
    const [{ zoneData }] = useStateValue();

    const getCreatureById = (id: string) => {
        for (const faction of Object.values(zoneData.creatures)) {
            const creature = faction.find(c => c.id === id);
            if (creature) return creature;
        }
    };

    return { getCreatureById };
}