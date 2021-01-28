import { Faction } from '../../../../types';
import { SET_CREATURE_TURN, SET_FACTION_TURN, TurnActions } from './types';

export function SetFactionTurn(faction: Faction): TurnActions {
    return {
        type: SET_FACTION_TURN,
        payload: faction
    };
}

export function SetCreatureTurn(creature: string): TurnActions {
    return {
        type: SET_CREATURE_TURN,
        payload: creature
    };
}
