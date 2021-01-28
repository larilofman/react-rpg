import { PlayerPositionActions, PlayerPositionState, SET_POSITION } from './types';

const initialState: PlayerPositionState = { x: 3, y: 3 };

const reducer = (state = initialState, action: PlayerPositionActions) => {
    switch (action.type) {
        case SET_POSITION:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;