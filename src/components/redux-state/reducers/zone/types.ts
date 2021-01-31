import { BaseCreature, Creature, Faction, InteractableTile, Position, ZoneStatus } from '../../../../types';
import { ZoneName } from '../../../../utils/load-data';
export const SET_MAP = 'SET_MAP';
export const MOVE_CREATURE = 'MOVE_CREATURE';
export const ADD_CREATURES = 'ADD_CREATURES';
export const DAMAGE_CREATURE = 'DAMAGE_CREATURE';
export const REMOVE_CREATURE = 'REMOVE_CREATURE';
export const LOAD_ZONE = 'LOAD_ZONE';
export const SAVE_VISITED_ZONE = 'SAVE_VISITED_ZONE';
export const REMOVE_VISITED_ZONE = 'REMOVE_VISITED_ZONE';
export const ADD_INTERACTABLE_TILES = 'ADD_INTERACTABLE_TILES';

interface SetMap {
    type: typeof SET_MAP,
    payload: ZoneStatus
}

interface MoveCreature {
    type: typeof MOVE_CREATURE,
    payload: { creature: BaseCreature, pos: Position }
}

interface AddCreatures {
    type: typeof ADD_CREATURES,
    payload: { creatures: Creature[], faction: Faction }
}

interface DamageCreature {
    type: typeof DAMAGE_CREATURE,
    payload: BaseCreature
}

interface RemoveCreature {
    type: typeof REMOVE_CREATURE,
    payload: BaseCreature
}

interface LoadZone {
    type: typeof LOAD_ZONE,
    payload: ZoneStatus
}

interface SaveVisitedZone {
    type: typeof SAVE_VISITED_ZONE,
    payload: ZoneStatus
}

interface RemoveVisitedZone {
    type: typeof REMOVE_VISITED_ZONE,
    payload: ZoneName
}

interface AddInteractableTiles {
    type: typeof ADD_INTERACTABLE_TILES,
    payload: InteractableTile[]
}

export type ZoneActions =
    SetMap |
    MoveCreature |
    AddCreatures |
    DamageCreature |
    RemoveCreature |
    LoadZone |
    SaveVisitedZone |
    RemoveVisitedZone |
    AddInteractableTiles

export type ZoneState = {
    status: ZoneStatus,
    zoneLoaded: boolean,
    visitedZones: ZoneStatus[],
    gameOver: boolean
}

