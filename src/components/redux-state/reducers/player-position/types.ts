import { Position } from '../../../../types';
export const SET_POSITION = 'SET_POSITION';

interface SetPlayerPosition {
    type: typeof SET_POSITION,
    payload: Position
}

export type PlayerPositionActions = SetPlayerPosition

export type PlayerPositionState = Position

