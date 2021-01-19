import { Position, ZoneData, Creature, Faction, BaseCreature } from '../../types';

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
    "ADD_COMBAT_LOG_ENTRY"
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
        type: ActionType.ADD_COMBAT_LOG_ENTRY;
        payload: string
    };