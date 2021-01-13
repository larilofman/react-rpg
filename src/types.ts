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
    up = 3
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
    occupant?: Creature
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

export interface ZoneData {
    size: Dimensions,
    tiles: Tile[][],
    creatures: {
        [Faction.Player]: Creature[],
        [Faction.Friendly]: Creature[],
        [Faction.Hostile]: Creature[]
    }
}

export interface Creature {
    id: string,
    faction: Faction,
    pos: Position
}

export enum DamageType {
    Physical
}

export interface Attack {
    type: DamageType,
    damage: number
}
