import { ZoneName } from './data/zones';

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

export interface TileType {
    id: number,
    position: Position,
    passable: boolean,
    spriteURL: string,
    spriteIndex: number,
}

export enum Faction {
    Player,
    Friendly,
    Hostile,
}

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

export enum InteractableTileType {
    ZoneRoute
}

export interface BaseInteractableTile {
    id: string
    position: Position
    type: InteractableTileType,
    popUpMessage?: string
}

export interface ZoneRouteType extends BaseInteractableTile {
    zoneName: ZoneName
    type: InteractableTileType.ZoneRoute
}

export type InteractableTile = ZoneRouteType
