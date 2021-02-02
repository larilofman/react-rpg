import { loadPlayerData } from '../../../../utils/load-data';
import { SET_GAME_OVER, GameState, GameActions, SAVE_PLAYER } from './types';

const initialState: GameState = {
    gameOver: false,
    player: loadPlayerData()
};

const reducer = (state = initialState, action: GameActions) => {
    switch (action.type) {
        case SET_GAME_OVER:
            return {
                ...state,
                gameOver: action.payload
            };
        case SAVE_PLAYER:
            return {
                ...state,
                player: action.payload
            };
        default:
            return state;
    }
};

export default reducer;