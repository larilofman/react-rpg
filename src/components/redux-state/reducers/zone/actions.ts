import { BaseCreature, Creature, Faction, InteractableTile, Position, Tile } from '../../../../types';
import { ZoneName } from '../../../../utils/load-data';
import {
    INIT_ZONE,
    ADD_CREATURES,
    SET_CREATURES,
    DAMAGE_CREATURE,
    MOVE_CREATURE,
    REMOVE_CREATURE,
    SET_TILES,
    ZoneActions,
    SET_OBJECTS
} from './types';

export function InitZone(zoneName: ZoneName): ZoneActions {
    return {
        type: INIT_ZONE,
        payload: zoneName
    };
}

export function SetTiles(tiles: Tile[][]): ZoneActions {
    return {
        type: SET_TILES,
        payload: tiles
    };
}

export const SetObjects = (objects: InteractableTile[]): ZoneActions => {
    return {
        type: SET_OBJECTS,
        payload: objects
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

export const SetCreatures = (creatures: { [Faction.Player]: Creature[], [Faction.Friendly]: Creature[], [Faction.Hostile]: Creature[] }): ZoneActions => {
    return {
        type: SET_CREATURES,
        payload: creatures
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




