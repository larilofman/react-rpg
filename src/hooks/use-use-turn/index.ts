import { useEffect, useState } from 'react';
import { Faction } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../components/redux-state/store';
import { SetCreatureTurn, SetFactionTurn } from '../../components/redux-state/reducers/turn/actions';

export default function useUseTurn() {
    const { turn, zoneStatus, mapLoaded } = useSelector((state: RootState) => ({ turn: state.turn, zoneStatus: state.zone.zoneStatus, mapLoaded: state.zone.mapLoaded }));
    const dispatch = useDispatch();
    const [factionIndex, setFactionIndex] = useState(0);

    // Called by a creature to increase the index keeping track which creature's turn inside the faction it is
    const useTurn = () => {
        setFactionIndex(prev => prev + 1);
    };

    useEffect(() => {
        if (mapLoaded) {
            // More creatures on the faction left, so set next one's turn
            if (factionIndex < zoneStatus.creatures[turn.faction].length) {
                dispatch(SetCreatureTurn(zoneStatus.creatures[turn.faction][factionIndex].id));
            } else {
                // Give turn to next faction and reset the index
                setFactionIndex(0);
                dispatch(SetFactionTurn(getNextFaction()));
            }
        }
    }, [factionIndex]);

    // When faction changes, give turn to the first one(as faction index was reset to 0 before faction change was called)
    // useEffect(() => {
    //     if (zoneStatus.creatures && zoneStatus.creatures[turn.faction].length) {
    //         dispatch(SetCreatureTurn(zoneStatus.creatures[turn.faction][factionIndex].id));
    //         // dispatch(
    //         //     {
    //         //         type: ActionType.SET_CREATURE_TURN,
    //         //         payload: zoneStatus.creatures[turn.faction][factionIndex].id
    //         //     }
    //         // );
    //     }

    // }, [turn.faction]);


    // If other factions are empty, give turn to player. Otherwise give the turn to the next faction if it has creatures
    const getNextFaction = () => {
        let nextFaction = Faction.Player;
        switch (turn.faction) {
            case Faction.Player:
                nextFaction = zoneStatus.creatures[Faction.Friendly].length ? Faction.Friendly : Faction.Hostile;
                break;
            case Faction.Friendly:
                nextFaction = zoneStatus.creatures[Faction.Hostile].length ? Faction.Hostile : Faction.Player;
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
