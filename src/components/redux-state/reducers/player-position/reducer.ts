import { PlayerPositionActions, PlayerPositionState, SET_PLAYER_POSITION } from './types';

const initialState: PlayerPositionState = { x: 0, y: 0 };

const reducer = (state = initialState, action: PlayerPositionActions) => {
    switch (action.type) {
        case SET_PLAYER_POSITION:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;