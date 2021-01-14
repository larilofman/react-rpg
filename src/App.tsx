import React from 'react';
import Map from './components/map';
import { useStateValue } from './components/state';
import GameManager from './components/game-manager';

const App = () => {
    const [{ tileSize, displaySize }] = useStateValue();

    return (
        <div
            id="zone-container"
            style={{
                width: displaySize.w * tileSize.w,
                height: displaySize.h * tileSize.h
            }}>
            <Map />
            <GameManager />
        </div>
    );
};

export default App;
