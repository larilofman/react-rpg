import { ADD_ENTRY, CombatLogActionTypes, CombatLogState } from './types';

const initialState: CombatLogState = { entries: [] };

const reducer = (state = initialState, action: CombatLogActionTypes) => {
    switch (action.type) {
        case ADD_ENTRY:
            return { entries: [...state.entries, action.payload] };
        default:
            return state;
    }
};

export default reducer;