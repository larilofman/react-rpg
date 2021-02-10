import { ADD_COMBAT_LOG_ENTRY, MessagesActionTypes, SET_INFO_MESSAGE } from './types';

export function AddCombatLogEntry(entry: string): MessagesActionTypes {
    return {
        type: ADD_COMBAT_LOG_ENTRY,
        payload: entry
    };
}

export function SetInfoMessage(entry: string): MessagesActionTypes {
    return {
        type: SET_INFO_MESSAGE,
        payload: entry
    };
}
