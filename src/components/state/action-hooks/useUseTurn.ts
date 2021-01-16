import { useEffect, useState } from 'react';
import { useStateValue, ActionType } from '../index';
import { Faction } from '../../../types';

export default function useUseTurn() {
    const [{ zoneData, turn }, dispatch] = useStateValue();
    const [turnQueue, setTurnQueue] = useState<Faction[]>([]);

    const useTurn = (faction: Faction) => {
        setTimeout(() => {
            setTurnQueue(prev => (prev.concat(faction)));
        }, getDelay());
    };

    useEffect(() => {
        if (turnQueue.length) {
            const turnToUse = turnQueue[0];
            setTurnQueue(prev => (prev.slice(1)));
            dispatch(
                {
                    type: ActionType.USE_TURN,
                    payload: turnToUse
                }
            );
        }

    }, [turnQueue]);

    useEffect(() => {
        console.log(turn.faction);
    }, [turn]);

    const getDelay = () => {
        let factionsActive = 0;
        for (const faction of Object.values(zoneData.creatures)) {
            if (faction.length) {
                factionsActive++;
            }
        }

        const delay = 100 / factionsActive;
        return delay;
    };

    return {
        useTurn
    };

    // useEffect(() => {
    //     if (useTurnQueued) {

    //         setUseTurnQueued(false);
    //     }
    // }, [zoneData, useTurnQueued]);

    // useEffect(() => {
    //     if (turnOf === faction && !useTurnQueued) {
    //         setCanAct(true);
    //     }
    // }, [turnOf]);

    // const canAct = (turnOf === faction && !useTurnQueued);


}

// export default function useUseTurn(faction: Faction) {
//     const [{ turnOf, zoneData }, dispatch] = useStateValue();
//     const [useTurnQueued, setUseTurnQueued] = useState(false);
//     const [canAct, setCanAct] = useState(false);

//     const useTurn = () => {
//         setCanAct(false);
//         setTimeout(() => {
//             setUseTurnQueued(true);
//         }, 5);
//     };

//     useEffect(() => {
//         if (useTurnQueued) {
//             dispatch(
//                 {
//                     type: ActionType.USE_TURN,
//                     payload: faction
//                 });
//             setUseTurnQueued(false);
//         }
//     }, [zoneData, useTurnQueued]);

//     useEffect(() => {
//         if (turnOf === faction && !useTurnQueued) {
//             setCanAct(true);
//         }
//     }, [turnOf]);

//     // const canAct = (turnOf === faction && !useTurnQueued);

//     return {
//         useTurn, canAct
//     };
// }