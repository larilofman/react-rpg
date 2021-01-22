import React from 'react';
import "./app.css";
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
                <GameManager />
            </div>
            <UiContainer size={{
                w: displaySize.w * tileSize.w + 8,
                h: 256
            }} />
        </div>
    );
};

export default App;
