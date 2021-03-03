import { ZoneName } from "../../../../data/zones";
import { BaseCreature, Creature, Faction } from "../../../../types/creature";
import { Position, Dimensions } from "../../../../types/general";
import { TileType, InteractableTile } from "../../../../types/tile";
export const SET_TILES = 'SET_TILES';
export const MOVE_CREATURE = 'MOVE_CREATURE';
export const ADD_CREATURES = 'ADD_CREATURES';
export const SET_CREATURES = 'SET_CREATURES';
export const DAMAGE_CREATURE = 'DAMAGE_CREATURE';
export const REMOVE_CREATURE = 'REMOVE_CREATURE';
export const SET_OBJECTS = 'SET_OBJECTS';
export const INIT_ZONE = 'INIT_ZONE';

interface InitZone {
    type: typeof INIT_ZONE,
    payload: ZoneName
}

interface SetTiles {
    type: typeof SET_TILES,
    payload: TileType[][]
}

interface SetObjects {
    type: typeof SET_OBJECTS,
    payload: InteractableTile[]
}

interface MoveCreature {
    type: typeof MOVE_CREATURE,
    payload: { creature: BaseCreature, pos: Position }
}

interface AddCreatures {
    type: typeof ADD_CREATURES,
    payload: { creatures: Creature[], faction: Faction }
}

interface SetCreatures {
    type: typeof SET_CREATURES,
    payload: {
        [Faction.Player]: Creature[],
        [Faction.Friendly]: Creature[],
        [Faction.Hostile]: Creature[]
    }
}

interface DamageCreature {
    type: typeof DAMAGE_CREATURE,
    payload: BaseCreature
}

interface RemoveCreature {
    type: typeof REMOVE_CREATURE,
    payload: BaseCreature
}

export type ZoneActions =
    InitZone |
    SetTiles |
    MoveCreature |
    AddCreatures |
    SetCreatures |
    DamageCreature |
    RemoveCreature |
    SetObjects

export type ZoneState = {
    name: ZoneName
    size: Dimensions
    tiles: TileType[][]
    creatures: {
        [Faction.Player]: Creature[],
        [Faction.Friendly]: Creature[],
        [Faction.Hostile]: Creature[]
    },
    interactableTiles: InteractableTile[]
    tilesLoaded: boolean
    objectsLoaded: boolean
    creaturesLoaded: boolean
}


