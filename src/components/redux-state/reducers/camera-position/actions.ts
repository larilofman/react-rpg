import { Position } from '../../../../types/general';
import { CameraPositionActions, SET_CAMERA_POSITION } from './types';

export function SetCameraPosition(position: Position): CameraPositionActions {
    return {
        type: SET_CAMERA_POSITION,
        payload: position
    };
}
