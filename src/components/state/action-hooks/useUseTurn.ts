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

    const useTurn = (faction: Faction) => {
        if (faction !== currentFaction) {
            setCurrentFaction(faction);
        }
        if (faction === Faction.Player) {
            setTurnsUsed(resetTurns());
        }
        setTurnsUsed(prev => {
            return {
                ...prev,
                [faction]: (prev[faction] + 1)
            };
        });

        // }
    };

    useEffect(() => {
        if (turnsUsed[currentFaction] === zoneData.creatures[currentFaction].length) {
            setTimeout(() => {
                setTurnComplete({ faction: currentFaction, turnCount: turn.num });
            }, getDelay());

        }
    }, [turnsUsed]);

    useEffect(() => {
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

    const getDelay = () => {
        let factionsActive = 0;
        for (const faction of Object.values(zoneData.creatures)) {
            if (faction.length) {
                factionsActive++;
            }
        }

        const delay = 50 / factionsActive;
        return delay;
    };

    return {
        useTurn
    };

}