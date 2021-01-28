import { Faction } from '../../../../types';
export const SET_FACTION_TURN = 'SET_FACTION_TURN';
export const SET_CREATURE_TURN = 'SET_CREATURE_TURN';

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

export type TurnActions = SetFactionTurn | SetCreatureturn

export type TurnState = Turn

