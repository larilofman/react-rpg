import { BaseCreature, Creature, Faction, InteractableTile, Position, ZoneData } from '../../../../types';
import { ZoneName } from '../../../../utils/load-zone-data';
import { ADD_CREATURES, ADD_INTERACTABLE_TILES, DAMAGE_CREATURE, LOAD_ZONE, MOVE_CREATURE, REMOVE_CREATURE, SAVE_VISITED_ZONE, SET_MAP, ZoneActions } from './types';

export function SetMap(zoneData: ZoneData): ZoneActions {
    return {
        type: SET_MAP,
        payload: zoneData
    };
}

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

export const LoadZone = (zoneData: ZoneData): ZoneActions => {
    return {
        type: LOAD_ZONE,
        payload: zoneData
    };
};

// export const LoadVisitedZone = (zoneData: ZoneData): ZoneActions => {
//     return {
//         type: LOAD_VISITED_ZONE,
//         payload: zoneData
//     };
// };

export const SaveVisitedZone = (zoneData: ZoneData): ZoneActions => {
    return {
        type: SAVE_VISITED_ZONE,
        payload: zoneData
    };
};

export const AddInteractableTiles = (interactableTiles: InteractableTile[]): ZoneActions => {
    return {
        type: ADD_INTERACTABLE_TILES,
        payload: interactableTiles
    };
};

// interface AddInteractableTiles {
//     type: typeof ADD_INTERACTABLE_TILES,
//     payload: InteractableTile[]
// }



