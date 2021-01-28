import { Faction } from '../../../../types';
import { TurnActions, SET_CREATURE_TURN, SET_FACTION_TURN, TurnState } from './types';

const initialState: TurnState = { faction: Faction.Player, creature: 'player', count: 0 };

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
        default:
            return state;
    }

    // case ActionType.SET_FACTION_TURN:
    //         return {
    //             ...state,
    //             turn: {
    //                 ...state.turn,
    //                 count: action.payload === Faction.Player ? state.turn.count + 1 : state.turn.count,
    //                 faction: action.payload
    //             }
    //         };
    //     case ActionType.SET_CREATURE_TURN:
    //         return {
    //             ...state,
    //             turn: {
    //                 ...state.turn,
    //                 creature: action.payload
    //             }
    //         };
};

export default reducer;