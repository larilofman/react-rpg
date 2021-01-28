import { Position } from '../../../../types';
import { PlayerPositionActions, SET_PLAYER_POSITION } from './types';

export function SetPlayerPosition(position: Position): PlayerPositionActions {
    return {
        type: SET_PLAYER_POSITION,
        payload: position
    };
}
