import { useStateValue, ActionType } from '../index';

export default function useUsePlayerTurn() {
    const [, dispatch] = useStateValue();

    const usePlayerTurn = () => {
        dispatch(
            {
                type: ActionType.USE_PLAYER_TURN
            });
    };

    return {
        usePlayerTurn
    };
}