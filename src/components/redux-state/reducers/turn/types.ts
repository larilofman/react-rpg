import { Faction } from '../../../../types';
export const SET_FACTION_TURN = 'SET_FACTION_TURN';
export const SET_CREATURE_TURN = 'SET_CREATURE_TURN';
export const INCREMENT_CREATURE_INDEX = 'INCREMENT_CREATURE_INDEX';
export const RESET_CREATURE_INDEX = 'RESET_CREATURE_INDEX';
export const RESET_TURN = "RESET_TURN";

export interface Turn {
    faction: Faction
    creature: string
    creatureIndex: number
    count: number
}

interface SetFactionTurn {
    type: typeof SET_FACTION_TURN,
    payload: Faction
}

interface SetCreatureTurn {
    type: typeof SET_CREATURE_TURN,
    payload: string
}

interface IncrementCreatureIndex {
    type: typeof INCREMENT_CREATURE_INDEX
}

interface ResetCreatureIndex {
    type: typeof RESET_CREATURE_INDEX
}

interface ResetTurn {
    type: typeof RESET_TURN
}

export type TurnActions =
    SetFactionTurn |
    SetCreatureTurn |
    IncrementCreatureIndex |
    ResetCreatureIndex |
    ResetTurn

export type TurnState = Turn

