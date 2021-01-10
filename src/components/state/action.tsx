import { Position, MapData } from '../../types';

export enum ActionType {
    "SET_PLAYER_POSITION",
    "SET_MAP",
    "USE_PLAYER_TURN",
    "USE_ENEMY_TURN"
}

export type Action =
    {
        type: ActionType.SET_PLAYER_POSITION;
        payload: Position;

    }
    | {
        type: ActionType.SET_MAP;
        payload: MapData;
    }
    | {
        type: ActionType.USE_PLAYER_TURN;
    }
    | {
        type: ActionType.USE_ENEMY_TURN;
    };