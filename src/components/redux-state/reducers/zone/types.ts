import { BaseCreature, Creature, Dimensions, Faction, InteractableTile, Position, Tile, ZoneStatus, ZoneRouteType } from '../../../../types';
import { ZoneName } from '../../../../utils/load-data';
export const SET_TILES = 'SET_TILES';
export const MOVE_CREATURE = 'MOVE_CREATURE';
export const ADD_CREATURES = 'ADD_CREATURES';
export const DAMAGE_CREATURE = 'DAMAGE_CREATURE';
export const REMOVE_CREATURE = 'REMOVE_CREATURE';
export const LOAD_ZONE = 'LOAD_ZONE';
export const SAVE_VISITED_ZONE = 'SAVE_VISITED_ZONE';
export const REMOVE_VISITED_ZONE = 'REMOVE_VISITED_ZONE';
export const SET_OBJECTS = 'SET_OBJECTS';
export const LOAD_ZONE_BY_NAME = 'LOAD_ZONE_BY_NAME';
export const SET_OBJECTS_LOADED = 'SET_OBJECTS_LOADED';
export const SET_CREATURES_LOADED = 'SET_CREATURES_LOADED';

interface SetTiles {
    type: typeof SET_TILES,
    payload: Tile[][]
}

interface SetObjects {
    type: typeof SET_OBJECTS,
    payload: InteractableTile[]
}

interface SetObjectsLoaded {
    type: typeof SET_OBJECTS_LOADED,
    payload: boolean
}

interface SetCreaturesLoaded {
    type: typeof SET_CREATURES_LOADED,
    payload: boolean
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
    payload: ZoneRouteType
}

interface SaveVisitedZone {
    type: typeof SAVE_VISITED_ZONE
}

interface RemoveVisitedZone {
    type: typeof REMOVE_VISITED_ZONE,
    payload: ZoneName
}

interface LoadZoneByName {
    type: typeof LOAD_ZONE_BY_NAME,
    payload: { zoneName: ZoneName, fresh: boolean, savePrevious: boolean }
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
    SetObjects |
    LoadZoneByName |
    SetObjectsLoaded |
    SetCreaturesLoaded

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
    tilesLoaded: boolean
    objectsLoaded: boolean
    creaturesLoaded: boolean
    visitedZones: ZoneStatus[]
    gameOver: boolean
    zoneRouteUsed: ZoneRouteType | undefined
}


