import { Position } from '../../../types';
import { useStateValue, ActionType } from '../index';

export default function useSetPlayerPosition() {
    const [, dispatch] = useStateValue();

    const setPlayerPosition = (position: Position) => {
        dispatch(
            {
                type: ActionType.SET_PLAYER_POSITION,
                payload: position
            });
    };

    return {
        setPlayerPosition
    };
}


