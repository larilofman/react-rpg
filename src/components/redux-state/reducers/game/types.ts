import { Creature, ZoneStatus } from "../../../../types";
import { ZoneName } from "../../../../utils/load-data";
export const SET_GAME_OVER = 'SET_GAME_OVER';
export const SAVE_PLAYER = 'SAVE_PLAYER';
export const LOAD_ZONE = 'LOAD_ZONE';
export const SAVE_VISITED_ZONE = 'SAVE_VISITED_ZONE';
export const REMOVE_VISITED_ZONE = 'REMOVE_VISITED_ZONE';
export const LOAD_ZONE_BY_NAME = 'LOAD_ZONE_BY_NAME';

interface SetGameOver {
    type: typeof SET_GAME_OVER,
    payload: boolean
}

interface SavePlayer {
    type: typeof SAVE_PLAYER,
    payload: Creature
}

interface LoadZone {
    type: typeof LOAD_ZONE,
    payload: ZoneName
}

interface SaveVisitedZone {
    type: typeof SAVE_VISITED_ZONE,
    payload: ZoneStatus
}

interface RemoveVisitedZone {
    type: typeof REMOVE_VISITED_ZONE,
    payload: ZoneName
}

interface LoadZoneByName {
    type: typeof LOAD_ZONE_BY_NAME,
    payload: { zoneName: ZoneName, fresh: boolean, savePrevious: boolean }
}

export type GameActions =
    SetGameOver |
    SavePlayer |
    LoadZone |
    SaveVisitedZone |
    RemoveVisitedZone |
    LoadZoneByName

export type GameState = {
    gameOver: boolean
    player: Creature
    visitedZones: ZoneStatus[]
    currentZone: ZoneName
}

