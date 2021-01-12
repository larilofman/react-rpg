import { Position } from '../../../types';
import { useStateValue, ActionType } from '../index';

export default function useSetCameraPosition() {
    const [, dispatch] = useStateValue();

    const setCameraPosition = (pos: Position) => {
        dispatch(
            {
                type: ActionType.SET_CAMERA_POSITION,
                payload: pos
            });
    };

    return {
        setCameraPosition
    };
}


