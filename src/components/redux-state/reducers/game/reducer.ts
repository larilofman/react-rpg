import { SET_GAME_OVER, GameState, GameActions } from './types';

const initialState: GameState = {
    gameOver: false
};

const reducer = (state = initialState, action: GameActions) => {
    switch (action.type) {
        case SET_GAME_OVER:
            return {
                ...state,
                gameOver: action.payload
            };
        default:
            return state;
    }
};

export default reducer;