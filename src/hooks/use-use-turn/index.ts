import { useEffect, useState } from 'react';
import { Faction } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../components/redux-state/store';
import { SetCreatureTurn, SetFactionTurn } from '../../components/redux-state/reducers/turn/actions';

export default function useUseTurn() {
    const { turn, creatures, mapLoaded } = useSelector((state: RootState) => ({ turn: state.turn, creatures: state.zone.status.creatures, mapLoaded: state.zone.mapLoaded }));
    const dispatch = useDispatch();
    const [factionIndex, setFactionIndex] = useState(0);

    // Called by a creature to increase the index keeping track which creature's turn inside the faction it is
    const useTurn = () => {
        setFactionIndex(prev => prev + 1);
    };

    useEffect(() => {
        if (mapLoaded) {
            // More creatures on the faction left, so set next one's turn
            if (factionIndex < creatures[turn.faction].length) {
                dispatch(SetCreatureTurn(creatures[turn.faction][factionIndex].id));
            } else {
                // Give turn to next faction and reset the index
                setFactionIndex(0);
                dispatch(SetFactionTurn(getNextFaction()));
            }
        }
    }, [factionIndex]);

    // When faction changes, give turn to the first one(as faction index was reset to 0 before faction change was called)
    // useEffect(() => {
    //     if (status.creatures && status.creatures[turn.faction].length) {
    //         dispatch(SetCreatureTurn(status.creatures[turn.faction][factionIndex].id));
    //         // dispatch(
    //         //     {
    //         //         type: ActionType.SET_CREATURE_TURN,
    //         //         payload: status.creatures[turn.faction][factionIndex].id
    //         //     }
    //         // );
    //     }

    // }, [turn.faction]);


    // If other factions are empty, give turn to player. Otherwise give the turn to the next faction if it has creatures
    const getNextFaction = () => {
        let nextFaction = Faction.Player;
        switch (turn.faction) {
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
