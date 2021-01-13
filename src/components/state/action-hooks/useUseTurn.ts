import { useStateValue, ActionType } from '../index';
import { Faction } from '../../../types';

export default function useUseTurn(faction: Faction) {
    const [{ turnOf }, dispatch] = useStateValue();

    const useTurn = () => {
        dispatch(
            {
                type: ActionType.USE_TURN,
                payload: faction
            });
    };

    const canAct = turnOf === faction;

    return {
        useTurn, canAct
    };
}