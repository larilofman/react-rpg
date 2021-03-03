import { Faction } from '../../../../types/creature';
import {
    TurnActions,
    SET_CREATURE_TURN,
    SET_FACTION_TURN,
    RESET_TURN,
    TurnState,
    INCREMENT_CREATURE_INDEX,
    RESET_CREATURE_INDEX
} from './types';

const initialState: TurnState = {
    faction: Faction.Player,
    creature: 'player',
    creatureIndex: 0,
    count: 0
};

const reducer = (state = initialState, action: TurnActions) => {
    switch (action.type) {
        case SET_FACTION_TURN:
            return {
                ...state,
                faction: action.payload,
                count: action.payload === Faction.Player ? state.count + 1 : state.count
            };
        case SET_CREATURE_TURN:
            return {
                ...state,
                creature: action.payload
            };
        case INCREMENT_CREATURE_INDEX:
            return {
                ...state,
                creatureIndex: state.creatureIndex + 1
            };
        case RESET_CREATURE_INDEX:
            return {
                ...state,
                creatureIndex: 0
            };
        case RESET_TURN:
            return {
                ...state,
                creatureIndex: 0,
                faction: Faction.Player,
                creature: 'player'
            };
        default:
            return state;
    }
};

export default reducer;