import { Faction } from '../../../../types';
import { INCREMENT_CREATURE_INDEX, RESET_CREATURE_INDEX, RESET_TURN, SET_CREATURE_TURN, SET_FACTION_TURN, TurnActions } from './types';

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

export function IncrementCreatureIndex(): TurnActions {
    return {
        type: INCREMENT_CREATURE_INDEX
    };
}

export function ResetCreatureIndex(): TurnActions {
    return {
        type: RESET_CREATURE_INDEX
    };
}

export function ResetTurn(): TurnActions {
    return {
        type: RESET_TURN
    };
}
