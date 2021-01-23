import zones from '../data/zones/zones.json';

export type ZoneName = keyof typeof zones;

export const loadZoneData = (name: ZoneName) => {
    return zones[name];
};

export const getAllZoneNames = () => {
    return Object.values(zones).map(z => z.name);
};