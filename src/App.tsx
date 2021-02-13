import React from 'react';
import "./app.css";
import Game from './components/game';
import UiContainer from './components/UI/ui-container';
import Menu from './components/UI/menu/menu-bar';

const App = () => {
    return (
        <div id="game-container">
            <Menu />
            <Game />
            <UiContainer />
        </div>
    );
};

export default App;
