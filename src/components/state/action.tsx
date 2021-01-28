import { Position, ZoneData, Creature, Faction, BaseCreature, InteractableTile, ZoneRouteType } from '../../types';
import { ZoneName } from '../../utils/load-zone-data';

export enum ActionType {
    "SET_PLAYER_POSITION",
    "SET_MAP",
    "SET_FACTION_TURN",
    "SET_CREATURE_TURN",
    "SET_CAMERA_POSITION",
    "MOVE_CREATURE",
    "ADD_CREATURES",
    "DAMAGE_CREATURE",
    "REMOVE_CREATURE",
    "LOAD_ZONE",
    "LOAD_FRESH_ZONE",
    "LOAD_VISITED_ZONE",
    "SAVE_VISITED_ZONE",
    "ADD_INTERACTABLE_TILES"
}

export type Action =
    {
        type: ActionType.SET_PLAYER_POSITION;
        payload: Position;

    }
    | {
        type: ActionType.SET_MAP;
        payload: ZoneData;
    }
    | {
        type: ActionType.SET_FACTION_TURN;
        payload: Faction
    }
    | {
        type: ActionType.SET_CREATURE_TURN;
        payload: string
    }
    | {
        type: ActionType.SET_CAMERA_POSITION;
        payload: Position;
    }
    | {
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
        type: ActionType.LOAD_ZONE;
        payload: ZoneRouteType
    }
    | {
        type: ActionType.SAVE_VISITED_ZONE;
        payload: ZoneData
    }
    | {
        type: ActionType.ADD_INTERACTABLE_TILES;
        payload: InteractableTile[]
    };