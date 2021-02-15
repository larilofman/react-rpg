import { zones } from '../data/zones/zones';
import { creatures } from '../data/creature';
import { Creature, Faction } from '../types';
import { ZoneData, ZoneName } from '../data/zones';

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