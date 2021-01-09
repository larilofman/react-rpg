import { Position, Tile } from '../../types';

export enum ActionType {
    "SET_PLAYER_POSITION",
    "SET_MAP"
}

export type Action =
    {
        type: ActionType.SET_PLAYER_POSITION;
        // payload: Position;
        payload: any
    }
    | {
        type: ActionType.SET_MAP;
        // payload: Tile[];
        payload: any
    };