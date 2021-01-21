import zones from '../data/zones/zones.json';

export type ZoneType = keyof typeof zones;

export const loadZoneData = (name: ZoneType) => {
    return zones[name];
};