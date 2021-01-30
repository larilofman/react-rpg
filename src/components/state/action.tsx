import { Position, ZoneStatus, Creature, Faction, BaseCreature, InteractableTile } from '../../types';
import { ZoneName } from '../../utils/load-data';

export enum ActionType {
    "MOVE_CREATURE",
    "ADD_CREATURES",
    "DAMAGE_CREATURE",
    "REMOVE_CREATURE",
    "LOAD_FRESH_ZONE",
    "LOAD_VISITED_ZONE",
    "SAVE_VISITED_ZONE",
    "ADD_INTERACTABLE_TILES"
}

export type Action =
    {
        type: ActionType.MOVE_CREATURE;
        payload: { creature: BaseCreature, pos: Position }
    }
    | {
        type: ActionType.ADD_CREATURES;
        payload: { creatures: Creature[], faction: Faction };
    }
    | {
        type: ActionType.DAMAGE_CREATURE;
        payload: BaseCreature
    }
    | {
        type: ActionType.REMOVE_CREATURE;
        payload: BaseCreature
    }
    | {
        type: ActionType.LOAD_FRESH_ZONE;
        payload: { zoneName: ZoneName, playerPosition?: Position }
    }
    | {
        type: ActionType.LOAD_VISITED_ZONE;
        payload: { zoneName: ZoneName, playerPosition?: Position }
    }
    | {
        type: ActionType.SAVE_VISITED_ZONE;
        payload: ZoneStatus
    }
    | {
        type: ActionType.ADD_INTERACTABLE_TILES;
        payload: InteractableTile[]
    };