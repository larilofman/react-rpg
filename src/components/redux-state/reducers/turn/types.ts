import { Faction } from '../../../../types';
export const SET_FACTION_TURN = 'SET_FACTION_TURN';
export const SET_CREATURE_TURN = 'SET_CREATURE_TURN';
export const RESET_TURN = "RESET_TURN";

export interface Turn {
    faction: Faction
    creature: string
    count: number
}

interface SetFactionTurn {
    type: typeof SET_FACTION_TURN,
    payload: Faction
}

interface SetCreatureturn {
    type: typeof SET_CREATURE_TURN,
    payload: string
}

interface ResetTurn {
    type: typeof RESET_TURN
}

export type TurnActions =
    SetFactionTurn |
    SetCreatureturn |
    ResetTurn

export type TurnState = Turn

