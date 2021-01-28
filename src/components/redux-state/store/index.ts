import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import combatLogReducer from '../reducers/combat-log';
import playerPositionReducer from '../reducers/player-position';

const rootReducer = combineReducers(
    {
        combatLog: combatLogReducer,
        playerPosition: playerPositionReducer
    });

const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof rootReducer>
export default store;