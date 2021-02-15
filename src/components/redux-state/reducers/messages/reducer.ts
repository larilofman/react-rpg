import {
    ADD_COMBAT_LOG_ENTRY,
    SET_INFO_MESSAGE,
    MessagesActionTypes,
    MessagesState
} from './types';
import { gameName } from '../../../../data/settings/general';

const initialState: MessagesState = {
    combatLogEntries: [],
    infoMessage: `Welcome to ${gameName}!`
};

const reducer = (state = initialState, action: MessagesActionTypes) => {
    switch (action.type) {
        case ADD_COMBAT_LOG_ENTRY:
            return {
                ...state,
                combatLogEntries: [...state.combatLogEntries, action.payload]
            };
        case SET_INFO_MESSAGE:
            return {
                ...state,
                infoMessage: action.payload
            };
        default:
            return state;
    }
};

export default reducer;