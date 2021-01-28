import { ADD_ENTRY, CombatLogActionTypes } from './types';

export function AddCombatLogEntry(entry: string): CombatLogActionTypes {
    return {
        type: ADD_ENTRY,
        payload: entry
    };
}
