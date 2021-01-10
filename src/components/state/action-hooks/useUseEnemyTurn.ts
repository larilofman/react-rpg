import { useStateValue, ActionType } from '../index';

export default function useUseEnemyTurn() {
    const [, dispatch] = useStateValue();

    const useEnemyTurn = () => {
        dispatch(
            {
                type: ActionType.USE_ENEMY_TURN
            });
    };

    return {
        useEnemyTurn
    };
}