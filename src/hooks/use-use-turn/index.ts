import { useEffect, useState } from 'react';
import { Faction } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../components/redux-state/store';
import { SetCreatureTurn, SetFactionTurn } from '../../components/redux-state/reducers/turn/actions';
import { turnDelay } from '../../data/settings/general';
import delay from 'lodash.delay';

export default function useUseTurn() {
    const { turnOfFaction, creatures, creaturesLoaded, gameOver } = useSelector((state: RootState) => (
        {
            turnOfFaction: state.turn.faction,
            creatures: state.zone.creatures,
            creaturesLoaded: state.zone.creaturesLoaded,
            gameOver: state.game.gameOver
        }
    ));
    const dispatch = useDispatch();
    const [factionIndex, setFactionIndex] = useState(0);

    // Called by a creature to increase the index keeping track which creature's turn inside the faction it is
    const useTurn = () => {
        setFactionIndex(prev => prev + 1);
        // delay(() => {
        //     setFactionIndex(prev => prev + 1);
        // }, 1);
    };

    useEffect(() => {
        if (creaturesLoaded) {
            // More creatures on the faction left, so set next one's turn
            if (factionIndex < creatures[turnOfFaction].length) {
                dispatch(SetCreatureTurn(creatures[turnOfFaction][factionIndex].id));
            } else {
                // Give turn to next faction and reset the index, adding a delay before each player turn, increasing it when player is dead
                const nextFaction = getNextFaction();
                if (nextFaction === Faction.Player) {
                    delay((faction) => {
                        dispatch(SetFactionTurn(faction));
                        setFactionIndex(0);
                    }, gameOver ? turnDelay * 4 : turnDelay, nextFaction);
                } else {
                    dispatch(SetFactionTurn(getNextFaction()));
                    setFactionIndex(0);
                }
            }
        }
    }, [factionIndex]);

    // If other factions are empty, give turn to player. Otherwise give the turn to the next faction if it has creatures
    const getNextFaction = () => {
        let nextFaction = Faction.Player;
        switch (turnOfFaction) {
            case Faction.Player:
                nextFaction = creatures[Faction.Friendly].length ? Faction.Friendly : Faction.Hostile;
                break;
            case Faction.Friendly:
                nextFaction = creatures[Faction.Hostile].length ? Faction.Hostile : Faction.Player;
                break;
            case Faction.Hostile:
                nextFaction = Faction.Player;
                break;
            default:
                break;
        }
        return nextFaction;
    };

    return { useTurn };
}
