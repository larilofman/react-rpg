import { Faction, ZoneRouteType } from '../../types';
import { ZoneType } from '../../utils/map/types';
import { CreatureType } from '../creature';
import { zones } from './zones';

const zoneNames: string[] = Object.keys(zones);
export type ZoneName = typeof zoneNames[number];

export interface ZoneData {
    name: ZoneName;
    zoneType: ZoneType;
    size: {
        w: number;
        h: number;
    };
    tiles: number[][] | null;
    creatures: {
        creature: CreatureType;
        amount: number;
        faction: Faction;
    }[];
    zoneRoutes: ZoneRouteType[];
}

export type ZoneDataMap = Record<ZoneName, ZoneData>
