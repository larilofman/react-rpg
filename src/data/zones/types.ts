import { ZoneRouteType } from '../../types';
import { zones } from './zones';

const zoneNames: string[] = Object.keys(zones);
export type ZoneName = typeof zoneNames[number];

export interface ZoneData {
    name: ZoneName;
    size: {
        w: number;
        h: number;
    };
    tiles: number[][] | null;
    creatures: {
        name: string;
        amount: number;
        faction: string;
    }[];
    zoneRoutes: ZoneRouteType[];
}

export type ZoneDataMap = Record<ZoneName, ZoneData>
