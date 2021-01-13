import { Position, ZoneData, Creature, Faction, Attack } from '../../types';

export enum ActionType {
    "SET_PLAYER_POSITION",
    "SET_MAP",
    "USE_TURN",
    "SET_CAMERA_POSITION",
    "OCCUPY_TILE",
    "ADD_CREATURES",
    "DAMAGE_CREATURE",
    "REMOVE_CREATURE"
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
        type: ActionType.USE_TURN;
        payload: Faction
    }
    | {
        type: ActionType.SET_CAMERA_POSITION;
        payload: Position;
    }
    | {
        type: ActionType.OCCUPY_TILE;
        payload: { creature: Creature, oldPos: Position };
    }
    | {
        type: ActionType.ADD_CREATURES;
        payload: { creatures: Creature[], faction: Faction };
    }
    | {
        type: ActionType.DAMAGE_CREATURE;
        payload: Creature
    }
    | {
        type: ActionType.REMOVE_CREATURE;
        payload: Creature
    };