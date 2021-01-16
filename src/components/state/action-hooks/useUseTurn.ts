import { useEffect, useState } from 'react';
import { useStateValue, ActionType } from '../index';
import { Faction } from '../../../types';

export default function useUseTurn(faction: Faction) {
    const [{ turnOf, zoneData }, dispatch] = useStateValue();
    const [useTurnQueued, setUseTurnQueued] = useState(false);
    const [canAct, setCanAct] = useState(false);

    const useTurn = () => {
        setCanAct(false);
        setTimeout(() => {
            setUseTurnQueued(true);
        }, 5);

    };

    useEffect(() => {
        if (useTurnQueued) {
            dispatch(
                {
                    type: ActionType.USE_TURN,
                    payload: faction
                });
            setUseTurnQueued(false);
        }
    }, [zoneData, useTurnQueued]);

    useEffect(() => {
        if (turnOf === faction && !useTurnQueued) {
            setCanAct(true);
        }
    }, [turnOf]);

    // const canAct = (turnOf === faction && !useTurnQueued);

    return {
        useTurn, canAct
    };
}