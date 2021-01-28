import { Position } from '../../../../types';
import { PlayerPositionActions, SET_POSITION } from './types';

export function SetPlayerPosition(position: Position): PlayerPositionActions {
    return {
        type: SET_POSITION,
        payload: position
    };
}
