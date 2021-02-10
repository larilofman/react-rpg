export const ADD_COMBAT_LOG_ENTRY = 'ADD_COMBAT_LOG_ENTRY';
export const SET_INFO_MESSAGE = 'SET_INFO_MESSAGE';

interface AddCombatLogEntry {
    type: typeof ADD_COMBAT_LOG_ENTRY,
    payload: string
}

interface SetInfoMessage {
    type: typeof SET_INFO_MESSAGE,
    payload: string
}

export type MessagesActionTypes =
    AddCombatLogEntry |
    SetInfoMessage

export interface MessagesState {
    combatLogEntries: string[]
    infoMessage: string
}

