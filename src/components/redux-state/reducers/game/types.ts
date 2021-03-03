import { ZoneName } from "../../../../data/zones";
import { Creature } from "../../../../types/creature";
import { ZoneStatus } from "../../../../types/zone";
export const SET_GAME_OVER = 'SET_GAME_OVER';
export const SAVE_PLAYER = 'SAVE_PLAYER';
export const RESET_PLAYER = 'RESET_PLAYER';
export const LOAD_ZONE = 'LOAD_ZONE';
export const LOAD_SAVED_ZONE = 'LOAD_SAVED_ZONE';
export const SAVE_VISITED_ZONE = 'SAVE_VISITED_ZONE';
export const REMOVE_VISITED_ZONE = 'REMOVE_VISITED_ZONE';

interface SetGameOver {
    type: typeof SET_GAME_OVER,
    payload: boolean
}

interface SavePlayer {
    type: typeof SAVE_PLAYER,
    payload: Creature
}

interface ResetPlayer {
    type: typeof RESET_PLAYER
}

interface LoadZone {
    type: typeof LOAD_ZONE,
    payload: ZoneName
}

interface LoadSavedZone {
    type: typeof LOAD_SAVED_ZONE,
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

export type GameActions =
    SetGameOver |
    SavePlayer |
    ResetPlayer |
    LoadZone |
    LoadSavedZone |
    SaveVisitedZone |
    RemoveVisitedZone

export type GameState = {
    gameOver: boolean
    player: Creature
    visitedZones: ZoneStatus[]
    currentZone: { name: ZoneName }
}

