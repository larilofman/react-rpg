import { BaseCreature, Creature, Dimensions, Faction, InteractableTile, Position, Tile, ZoneStatus } from '../../../../types';
import { ZoneName } from '../../../../utils/load-data';
export const SET_TILES = 'SET_TILES';
export const MOVE_CREATURE = 'MOVE_CREATURE';
export const ADD_CREATURES = 'ADD_CREATURES';
export const DAMAGE_CREATURE = 'DAMAGE_CREATURE';
export const REMOVE_CREATURE = 'REMOVE_CREATURE';
export const LOAD_ZONE = 'LOAD_ZONE';
export const SAVE_VISITED_ZONE = 'SAVE_VISITED_ZONE';
export const REMOVE_VISITED_ZONE = 'REMOVE_VISITED_ZONE';
export const ADD_INTERACTABLE_TILES = 'ADD_INTERACTABLE_TILES';

interface SetTiles {
    type: typeof SET_TILES,
    payload: Tile[][]
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
    SetTiles |
    MoveCreature |
    AddCreatures |
    DamageCreature |
    RemoveCreature |
    LoadZone |
    SaveVisitedZone |
    RemoveVisitedZone |
    AddInteractableTiles

export type ZoneState = {
    name: ZoneName
    size: Dimensions
    tiles: Tile[][]
    creatures: {
        [Faction.Player]: Creature[],
        [Faction.Friendly]: Creature[],
        [Faction.Hostile]: Creature[]
    },
    interactableTiles: InteractableTile[]
    zoneLoaded: boolean
    visitedZones: ZoneStatus[]
    gameOver: boolean
}


