import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import combatLogReducer from '../reducers/combat-log-reducer';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import anecdoteReducer from './reducers/anecdoteReducer';
// import notificationReducer from './reducers/notificationReducer';
// import filterReducer from './reducers/filterReducer';

const reducer = combineReducers(
    {
        combatLog: combatLogReducer
        // notification: notificationReducer,
        // filter: filterReducer
    });

const store = createStore(reducer, composeWithDevTools());
//     reducer,
//     composeWithDevTools(applyMiddleware(thunk))
// );

export default store;