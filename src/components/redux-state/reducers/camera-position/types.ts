import { Position } from '../../../../types/general';
export const SET_CAMERA_POSITION = 'SET_CAMERA_POSITION';

interface SetCameraPosition {
    type: typeof SET_CAMERA_POSITION,
    payload: Position
}

export type CameraPositionActions = SetCameraPosition

export type CameraPositionState = Position

