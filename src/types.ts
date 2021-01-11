export interface Position {
    x: number,
    y: number
}

export interface Dimensions {
    w: number,
    h: number
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

// export interface Tile {
//     type: TileType,
//     id: number,
//     position: Position,
//     passable: boolean
// }

interface BaseTile {
    type: TileType,
    id: number,
    position: Position,
    passable?: boolean,
    spriteIndex?: number
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

export interface MapData {
    size: Dimensions,
    tiles: Tile[][]
}
