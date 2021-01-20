import React from 'react';
import "./app.css";
import Map from './components/map';
import { useStateValue } from './components/state';
import GameManager from './components/game-manager';
import UiContainer from './components/UI/ui-container';

const App = () => {
    const [{ tileSize, displaySize }] = useStateValue();

    return (
        <div id="game-container">
            <div
                id="zone-container"
                style={{
                    width: displaySize.w * tileSize.w,
                    height: displaySize.h * tileSize.h
                }}>
                <Map />
                <GameManager />
            </div>
            <UiContainer size={{
                w: displaySize.w * tileSize.w + 8,
                h: 400
            }} />
        </div>
    );
};

export default App;
