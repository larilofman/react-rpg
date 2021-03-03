import { ZoneName, zones } from '../data/zones';
import { creatures } from '../data/creature';
import { Creature, Faction } from '../types/creature';
import { ZoneData } from '../types/zone';

export const loadZoneData = (nameName: ZoneName) => {
    const zone = zones[nameName] as unknown as ZoneData;
    return zone;
};

export const loadPlayerData = () => {
    const female1 = creatures['female1'];
    const player: Creature = {
        ...female1,
        faction: Faction.Player,
        id: 'player',
        pos: { x: 0, y: 0 }
    };
    return player;
};

export const getAllZoneNames = () => {
    return Object.values(zones).map(z => z.name);
};