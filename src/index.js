import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles.css";
import { reducer, StateProvider } from './components/state';

ReactDOM.render(
  <StateProvider reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root')
);
