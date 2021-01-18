import { useEffect, useState } from 'react';
import { useStateValue, ActionType } from '../index';
import { Faction } from '../../../types';


export default function useUseTurn() {
    const [{ zoneData, turn, mapLoaded }, dispatch] = useStateValue();
    const [factionIndex, setFactionIndex] = useState(0);
    const turnDelay = 25;

    // Called by a creature to increase the index keeping track which creature's turn inside the faction it is
    const useTurn = () => {
        setFactionIndex(prev => prev + 1);
    };

    useEffect(() => {
        if (mapLoaded) {
            // If index is at max(faction about to change), add a little delay
            if (factionIndex >= zoneData.creatures[turn.faction].length) {
                const date = Date.now();
                let currentDate = null;
                do {
                    currentDate = Date.now();
                } while (currentDate - date < getDelay());
            }
            // More creatures on the faction left, so set next one's turn
            if (factionIndex < zoneData.creatures[turn.faction].length) {
                dispatch(
                    {
                        type: ActionType.SET_CREATURE_TURN,
                        payload: zoneData.creatures[turn.faction][factionIndex].id
                    }
                );
            } else {
                // Give turn to next faction and reset the index
                setFactionIndex(0);
                dispatch(
                    {
                        type: ActionType.SET_FACTION_TURN,
                        payload: getNextFaction()
                    }
                );
            }
        }
    }, [factionIndex]);

    // When faction changes, give turn to the first one(as faction index was reset to 0 before faction change was called)
    useEffect(() => {
        if (zoneData.creatures && zoneData.creatures[turn.faction].length) {
            dispatch(
                {
                    type: ActionType.SET_CREATURE_TURN,
                    payload: zoneData.creatures[turn.faction][factionIndex].id
                }
            );
        }

    }, [turn.faction]);


    // If other factions are empty, give turn to player. Otherwise give the turn to the next faction if it has creatures
    const getNextFaction = () => {
        let nextFaction = Faction.Player;
        switch (turn.faction) {
            case Faction.Player:
                nextFaction = zoneData.creatures[Faction.Friendly].length ? Faction.Friendly : Faction.Hostile;
                break;
            case Faction.Friendly:
                nextFaction = zoneData.creatures[Faction.Hostile].length ? Faction.Hostile : Faction.Player;
                break;
            case Faction.Hostile:
                nextFaction = Faction.Player;
                break;
            default:
                break;
        }
        return nextFaction;
    };

    // Calculate the delay for a full turn of all active factions on the map
    const getDelay = () => {
        let factionsActive = 0;
        for (const faction of Object.values(zoneData.creatures)) {
            if (faction.length) {
                factionsActive++;
            }
        }

        const delay = turnDelay / factionsActive;
        return delay;
    };

    return { useTurn };
}


// const resetTurns = () => {
//     return { [Faction.Player]: 0, [Faction.Hostile]: 0, [Faction.Friendly]: 0 };
// };

// export default function useUseTurn() {
//     const [{ zoneData, turn }, dispatch] = useStateValue();
//     const [turnComplete, setTurnComplete] = useState<{ faction: Faction, turnCount: number }>();
//     // const [currentFaction, setCurrentFaction] = useState<Faction>(turn.faction);
//     const [turnsUsed, setTurnsUsed] = useState(resetTurns());
//     const { getCreatureById } = useGetCreature();
//     const turnDelay = 50;

//     const useTurn = (creature: BaseCreature) => {
//         // When a character from next faction calls the function, change current faction

//         // On every player turn, reset the tracker keeping counts of creatures of each faction that have acted
//         if (creature.faction === Faction.Player) {
//             setTurnsUsed(resetTurns());
//         }
//         // Update the faction turns used tracker by adding the calling creature
//         setTurnsUsed(prev => {
//             return {
//                 ...prev,
//                 [creature.faction]: (prev[creature.faction] + 1)
//             };
//         });
//     };


//     useEffect(() => {
//         // Whenever tracker gets updated, check if all creatures of the faction have used their turn and if so, set the faction's turn complete
//         if (turnsUsed[turn.faction] === zoneData.creatures[turn.faction].length) {
//             setTimeout(() => {
//                 setTurnComplete({ faction: turn.faction, turnCount: turn.count });
//             }, getDelay());

//         }
//     }, [turnsUsed]);

//     useEffect(() => {
//         // When a faction has finished their turn, find out the next faction based on current active factions on the map
//         let nextTurn = Faction.Player;

//         if (!zoneData.creatures[Faction.Hostile].length && !zoneData.creatures[Faction.Friendly].length) {
//             nextTurn = Faction.Player;
//         } else {
//             switch (turnComplete?.faction) {
//                 case Faction.Player:
//                     nextTurn = zoneData.creatures[Faction.Friendly].length ? Faction.Friendly : Faction.Hostile;
//                     break;
//                 case Faction.Friendly:
//                     nextTurn = zoneData.creatures[Faction.Hostile].length ? Faction.Hostile : Faction.Player;
//                     break;
//                 case Faction.Hostile:
//                     nextTurn = Faction.Player;
//                     break;
//                 default:
//                     break;
//             }
//         }
//         // console.log(`All creatures of ${nextTurn} took turn.`);
//         dispatch(
//             {
//                 type: ActionType.USE_FACTION_TURN,
//                 payload: nextTurn
//             });


//     }, [turnComplete]);



//     return {
//         useTurn
//     };

// }