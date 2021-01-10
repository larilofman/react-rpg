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
                mapData: action.payload,
                mapLoaded: true
            };
        case ActionType.USE_PLAYER_TURN:
            return {
                ...state,
                playerTurn: false
            };
        case ActionType.USE_ENEMY_TURN:
            return {
                ...state,
                playerTurn: true
            };
        default:
            return state;
    }
};

