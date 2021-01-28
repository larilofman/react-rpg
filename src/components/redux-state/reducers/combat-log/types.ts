export const ADD_ENTRY = 'ADD_ENTRY';

interface AddEntryAction {
    type: typeof ADD_ENTRY,
    payload: string
}

export type CombatLogActionTypes = AddEntryAction

export interface CombatLogState {
    entries: string[]
}

