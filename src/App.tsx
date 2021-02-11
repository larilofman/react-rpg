import React from 'react';
import "./app.css";
import GameManager from './components/game-manager';
import UiContainer from './components/UI/ui-container';
import settings from './data/settings/general.json';
import Menu from './components/UI/menu/menu-bar';

const App = () => {

    return (
        <div id="game-container">
            <Menu />
            <div
                id="zone-container"
                style={{
                    width: settings.displaySize.w * settings.tileSize.w,
                    height: settings.displaySize.h * settings.tileSize.h
                }}>
                <GameManager />
            </div>
            <UiContainer size={{
                w: settings.displaySize.w * settings.tileSize.w + 8,
                h: 256
            }} />
        </div>
    );
};

export default App;
