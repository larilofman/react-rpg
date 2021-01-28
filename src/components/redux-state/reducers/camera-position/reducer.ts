import { CameraPositionActions, CameraPositionState, SET_CAMERA_POSITION } from './types';

const initialState: CameraPositionState = { x: 0, y: 0 };

const reducer = (state = initialState, action: CameraPositionActions) => {
    switch (action.type) {
        case SET_CAMERA_POSITION:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;