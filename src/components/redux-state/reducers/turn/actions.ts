import { Faction } from '../../../../types';
import { RESET_TURN, SET_CREATURE_TURN, SET_FACTION_TURN, TurnActions } from './types';

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

export function ResetTurn(): TurnActions {
    return {
        type: RESET_TURN
    };
}
