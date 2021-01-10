import { State, Action, ActionType } from '../state';
import { Position, MapData } from '../../types';


export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.SET_PLAYER_POSITION:
            return {
                ...state,
                playerPosition: action.payload
            };
        case ActionType.SET_MAP:
            return {
                ...state,
                mapData: action.payload
            };
        default:
            return state;
    }
};

export const setPlayerPosition = (position: Position): Action => {
    return (
        {
            type: ActionType.SET_PLAYER_POSITION,
            payload: position
        }
    );
};

export const setMap = (map: MapData): Action => {
    return (
        {
            type: ActionType.SET_MAP,
            payload: map
        }
    );
};
