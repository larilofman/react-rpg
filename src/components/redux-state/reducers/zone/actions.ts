import { BaseCreature, Creature, Faction, InteractableTile, Position, Tile, ZoneStatus } from '../../../../types';
import { ZoneName } from '../../../../utils/load-data';
import {
    ADD_CREATURES,
    SET_INTERACTABLE_TILES,
    DAMAGE_CREATURE,
    LOAD_ZONE,
    MOVE_CREATURE,
    REMOVE_CREATURE,
    SAVE_VISITED_ZONE,
    REMOVE_VISITED_ZONE,
    SET_TILES,
    ZoneActions
} from './types';

export function SetTiles(tiles: Tile[][]): ZoneActions {
    return {
        type: SET_TILES,
        payload: tiles
    };
}

export const SetInteractableTiles = (interactableTiles: InteractableTile[]): ZoneActions => {
    return {
        type: SET_INTERACTABLE_TILES,
        payload: interactableTiles
    };
};

export const MoveCreature = (creature: BaseCreature, pos: Position): ZoneActions => {
    return {
        type: MOVE_CREATURE,
        payload: { creature, pos }
    };
};

export const AddCreatures = (creatures: Creature[], faction: Faction): ZoneActions => {
    return {
        type: ADD_CREATURES,
        payload: { creatures, faction }
    };
};

export const DamageCreature = (creature: Creature): ZoneActions => {
    return {
        type: DAMAGE_CREATURE,
        payload: creature
    };
};

export const RemoveCreature = (creature: BaseCreature): ZoneActions => {
    return {
        type: REMOVE_CREATURE,
        payload: creature
    };
};

export const LoadZone = (status: ZoneStatus): ZoneActions => {
    return {
        type: LOAD_ZONE,
        payload: status
    };
};

export const SaveVisitedZone = (status: ZoneStatus): ZoneActions => {
    return {
        type: SAVE_VISITED_ZONE,
        payload: status
    };
};

export const RemoveVisitedZone = (zoneName: ZoneName): ZoneActions => {
    return {
        type: REMOVE_VISITED_ZONE,
        payload: zoneName
    };
};



