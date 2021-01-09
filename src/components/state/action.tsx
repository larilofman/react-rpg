import { Position } from '../../types';

export type Action =
    | {
        type: "SET_PLAYER_POSITION";
        payload: Position;
    }
    | {
        type: "LOG_STUFF";
        payload: string;
    };