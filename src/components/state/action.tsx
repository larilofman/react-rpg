import { Position, ZoneData, Creature, Tile } from '../../types';

export enum ActionType {
    "SET_PLAYER_POSITION",
    "SET_MAP",
    "USE_PLAYER_TURN",
    "USE_ENEMY_TURN",
    "SET_CAMERA_POSITION",
    "OCCUPY_TILE"
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
        type: ActionType.USE_PLAYER_TURN;
    }
    | {
        type: ActionType.USE_ENEMY_TURN;
    }
    | {
        type: ActionType.SET_CAMERA_POSITION;
        payload: Position;
    }
    | {
        type: ActionType.OCCUPY_TILE;
        payload: { creature: Creature, oldPos: Position };
    };