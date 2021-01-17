import { useEffect, useState } from 'react';
import { useStateValue, ActionType } from '../index';
import { Faction } from '../../../types';


const resetTurns = () => {
    return { [Faction.Player]: 0, [Faction.Hostile]: 0, [Faction.Friendly]: 0 };
};

export default function useUseTurn() {
    const [{ zoneData, turn }, dispatch] = useStateValue();
    const [turnComplete, setTurnComplete] = useState<{ faction: Faction, turnCount: number }>();
    const [currentFaction, setCurrentFaction] = useState<Faction>(turn.faction);
    const [turnsUsed, setTurnsUsed] = useState(resetTurns());
    const turnDelay = 50;

    const useTurn = (faction: Faction) => {
        // When a character from next faction calls the function, change current faction
        if (faction !== currentFaction) {
            setCurrentFaction(faction);
        }
        // On every player turn, reset the tracker keeping counts of creatures of each faction that have acted
        if (faction === Faction.Player) {
            setTurnsUsed(resetTurns());
        }
        // Update the faction turns used tracker by adding the calling creature
        setTurnsUsed(prev => {
            return {
                ...prev,
                [faction]: (prev[faction] + 1)
            };
        });
    };


    useEffect(() => {
        // Whenever tracker gets updated, check if all creatures of the faction have used their turn and if so, set the faction's turn complete
        if (turnsUsed[currentFaction] === zoneData.creatures[currentFaction].length) {
            setTimeout(() => {
                setTurnComplete({ faction: currentFaction, turnCount: turn.num });
            }, getDelay());

        }
    }, [turnsUsed]);

    useEffect(() => {
        // When a faction has finished their turn, find out the next faction based on current active factions on the map
        let nextTurn = Faction.Player;

        if (!zoneData.creatures[Faction.Hostile].length && !zoneData.creatures[Faction.Friendly].length) {
            nextTurn = Faction.Player;
        } else {
            switch (turnComplete?.faction) {
                case Faction.Player:
                    nextTurn = zoneData.creatures[Faction.Friendly].length ? Faction.Friendly : Faction.Hostile;
                    break;
                case Faction.Friendly:
                    nextTurn = zoneData.creatures[Faction.Hostile].length ? Faction.Hostile : Faction.Player;
                    break;
                case Faction.Hostile:
                    nextTurn = Faction.Player;
                    break;
                default:
                    break;
            }
        }
        // console.log(`All creatures of ${nextTurn} took turn.`);
        dispatch(
            {
                type: ActionType.USE_TURN,
                payload: nextTurn
            });


    }, [turnComplete]);

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

    return {
        useTurn
    };

}