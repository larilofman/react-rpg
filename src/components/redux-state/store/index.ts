import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import combatLogReducer from '../reducers/combat-log/reducer';
import cameraPositionReducer from '../reducers/camera-position/reducer';
import zoneReducer from '../reducers/zone/reducer';
import gameReducer from '../reducers/game/reducer';
import turnReducer from '../reducers/turn/reducer';

const rootReducer = combineReducers(
    {
        combatLog: combatLogReducer,
        cameraPosition: cameraPositionReducer,
        turn: turnReducer,
        zone: zoneReducer,
        game: gameReducer
    });

const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof rootReducer>
export default store;