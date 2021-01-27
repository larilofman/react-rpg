import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { reducer, StateProvider } from './components/state';
import { Provider } from 'react-redux';
import store from './components/redux-state/store';

ReactDOM.render(
  <Provider store={store}>
    <StateProvider reducer={reducer}>
      <App />
    </StateProvider>
  </Provider>,
  document.getElementById('root')
);
