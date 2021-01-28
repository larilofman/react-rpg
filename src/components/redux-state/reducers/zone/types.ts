import { BaseCreature, Creature, Faction, InteractableTile, Position, ZoneData } from '../../../../types';
import { ZoneName } from '../../../../utils/load-zone-data';
export const SET_MAP = 'SET_MAP';
export const MOVE_CREATURE = 'MOVE_CREATURE';
export const ADD_CREATURES = 'ADD_CREATURES';
export const DAMAGE_CREATURE = 'DAMAGE_CREATURE';
export const REMOVE_CREATURE = 'REMOVE_CREATURE';
export const LOAD_FRESH_ZONE = 'LOAD_FRESH_ZONE';
export const LOAD_VISITED_ZONE = 'LOAD_VISITED_ZONE';
export const SAVE_VISITED_ZONE = 'SAVE_VISITED_ZONE';
export const ADD_INTERACTABLE_TILES = 'ADD_INTERACTABLE_TILES';

interface SetMap {
    type: typeof SET_MAP,
    payload: ZoneData
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

interface LoadFreshZone {
    type: typeof LOAD_FRESH_ZONE,
    payload: { zoneName: ZoneName, playerPosition?: Position }
}

interface LoadVisitedZone {
    type: typeof LOAD_VISITED_ZONE,
    payload: { zoneName: ZoneName, playerPosition?: Position }
}

interface SaveVisitedZone {
    type: typeof SAVE_VISITED_ZONE,
    payload: ZoneData
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
    LoadFreshZone |
    LoadVisitedZone |
    SaveVisitedZone |
    AddInteractableTiles

export type ZoneState = {
    zoneData: ZoneData,
    mapLoaded: boolean,
    visitedZones: ZoneData[],
    gameOver: boolean
}

