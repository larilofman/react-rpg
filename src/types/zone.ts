import { ZoneName } from "../data/zones";
import { Faction, Creature, CreatureType } from "./creature";
import { Dimensions } from "./general";
import { TileType, InteractableTile, ZoneRouteType } from "./tile";

export interface ZoneStatus {
    name: ZoneName,
    size: Dimensions,
    tiles: TileType[][],
    creatures: {
        [Faction.Player]: Creature[],
        [Faction.Friendly]: Creature[],
        [Faction.Hostile]: Creature[]
    }
    interactableTiles: InteractableTile[]
}

export enum ZoneEnvironment {
    Village,
    Dungeon
}

export interface ZoneType {
    environment: ZoneEnvironment
    floorSprite: number
    wallSprite: number
    numRandomRooms?: number
}

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