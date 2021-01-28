import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { reducer, StateProvider } from './components/state';
import { Provider } from 'react-redux';
import store from './components/redux-state/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
