import { Position } from '../../../../types';
export const SET_PLAYER_POSITION = 'SET_PLAYER_POSITION';

interface SetPlayerPosition {
    type: typeof SET_PLAYER_POSITION,
    payload: Position
}

export type PlayerPositionActions = SetPlayerPosition

export type PlayerPositionState = Position

