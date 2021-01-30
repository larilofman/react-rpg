import zones from '../data/zones/zones.json';
import playerData from '../data/player/playerData.json';
import { ZoneType, Creature, Faction } from '../types';

export type ZoneName = keyof typeof zones;

export const loadZoneData = (name: ZoneName) => {
    const zone = zones[name] as ZoneType;
    return zone;
};

export const loadPlayerData = () => {
    const player: Creature = {
        ...playerData.female1,
        faction: Faction[playerData.female1.faction as unknown as Faction] as unknown as Faction
    };
    return player;
};

export const getAllZoneNames = () => {
    return Object.values(zones).map(z => z.name);
};