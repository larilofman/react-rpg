import { useEffect, useState } from 'react';
import { useStateValue, ActionType } from '../index';
import { Faction } from '../../../types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux-state/store';
import { SetCreatureTurn, SetFactionTurn } from '../../redux-state/reducers/turn/actions';

export default function useUseTurn() {
    const turn = useSelector((state: RootState) => state.turn);
    const dispatch = useDispatch();
    const [{ zoneData, mapLoaded }] = useStateValue();
    const [factionIndex, setFactionIndex] = useState(0);

    // Called by a creature to increase the index keeping track which creature's turn inside the faction it is
    const useTurn = () => {
        setFactionIndex(prev => prev + 1);
    };

    useEffect(() => {
        if (mapLoaded) {
            // More creatures on the faction left, so set next one's turn
            if (factionIndex < zoneData.creatures[turn.faction].length) {
                dispatch(SetCreatureTurn(zoneData.creatures[turn.faction][factionIndex].id));
                // dispatch(
                //     {
                //         type: ActionType.SET_CREATURE_TURN,
                //         payload: zoneData.creatures[turn.faction][factionIndex].id
                //     }
                // );
            } else {
                // Give turn to next faction and reset the index
                setFactionIndex(0);
                dispatch(SetFactionTurn(getNextFaction()));
                // dispatch(
                //     {
                //         type: ActionType.SET_FACTION_TURN,
                //         payload: getNextFaction()
                //     }
                // );
            }
        }
    }, [factionIndex]);

    // When faction changes, give turn to the first one(as faction index was reset to 0 before faction change was called)
    // useEffect(() => {
    //     if (zoneData.creatures && zoneData.creatures[turn.faction].length) {
    //         dispatch(SetCreatureTurn(zoneData.creatures[turn.faction][factionIndex].id));
    //         // dispatch(
    //         //     {
    //         //         type: ActionType.SET_CREATURE_TURN,
    //         //         payload: zoneData.creatures[turn.faction][factionIndex].id
    //         //     }
    //         // );
    //     }

    // }, [turn.faction]);


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

    return { useTurn };
}
