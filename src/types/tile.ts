import { ZoneName } from "../data/zones";
import { Position } from "./general";

export interface TileType {
    id: number,
    position: Position,
    passable: boolean,
    spriteURL: string,
    spriteIndex: number,
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