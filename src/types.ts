import { ZoneName } from './utils/load-data';

export interface Position {
    x: number,
    y: number
}

export interface Dimensions {
    w: number,
    h: number
}

export interface Rectangle {
    pos: Position,
    size: Dimensions
}

export enum Direction {
    down = 0,
    left = 1,
    right = 2,
    up = 3,
    upRight = 4,
    downRight = 5,
    downLeft = 6,
    upLeft = 7

}

export interface SpriteData {
    offset_x: number,
    offset_y: number,
    image: string,
    layer: number
}

export enum TileType {
    floor,
    wall
}

interface BaseTile {
    type: TileType,
    id: number,
    position: Position,
    passable?: boolean,
    spriteIndex?: number,
}

export interface FloorTile extends BaseTile {
    type: TileType.floor
    passable: true
}

export interface WallTile extends BaseTile {
    type: TileType.wall
    passable: false
}

export type Tile = FloorTile | WallTile

export enum Faction {
    Player,
    Friendly,
    Hostile,
}

export interface ZoneStatus {
    name: ZoneName,
    size: Dimensions,
    tiles: Tile[][],
    creatures: {
        [Faction.Player]: Creature[],
        [Faction.Friendly]: Creature[],
        [Faction.Hostile]: Creature[]
    }
    interactableTiles: InteractableTile[]
}

export interface Stats {
    health: number,
    maxHealth: number,
    damage: number
}

export interface BaseCreature {
    id: string,
    faction: Faction
}

export interface Creature extends BaseCreature {
    pos: Position,
    stats: Stats,
    name: string,
    sprite: string
}

export enum DamageType {
    Physical
}

export interface Attack {
    type: DamageType,
    damage: number
}

export enum TileStatus {
    Passable,
    Occupied,
    NonPassable
}

export interface CreatureType {
    name: string,
    stats: Stats,
    pos?: Position,
    sprite: string
}

export interface ZoneType {
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

export enum InteractableTileType {
    ZoneRoute
}

export interface BaseInteractableTile {
    id: string
    position: Position
    name: string
    type: InteractableTileType
}

export interface ZoneRouteType extends BaseInteractableTile {
    linkedRoute: { zone: ZoneName, id: string }
}

export type InteractableTile = ZoneRouteType

// type DiscriminateUnion<T, K extends keyof T, V extends T[K]> =
//     T extends Record<K, V> ? T : never

// type TypeToFunc<U extends InteractableTile> = {
//     readonly [T in U['tag']]: (x: DiscriminateUnion<InteractableTile, 'tag', T>) => string
// }
