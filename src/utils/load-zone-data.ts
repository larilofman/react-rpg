import zones from '../data/zones/zones.json';
import { ZoneType } from '../types';

export type ZoneName = keyof typeof zones;

export const loadZoneData = (name: ZoneName) => {
    const zone = zones[name] as ZoneType;
    return zone;
};

export const getAllZoneNames = () => {
    return Object.values(zones).map(z => z.name);
};