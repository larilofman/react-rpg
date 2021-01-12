import React from 'react';
import Player from './components/player';
import Npc from './components/npc';
import Map from './components/map';
import { useStateValue } from './components/state';

const App = () => {
  const [{ tileSize, displaySize }] = useStateValue();

  return (
    <div
      className="zone-container"
      style={{
        width: displaySize.w * tileSize.w,
        height: displaySize.h * tileSize.h
      }}>
      <Player skin="f1" />
      {/* <Npc skin="e1" /> */}
      <Map />
    </div>
  );
};

export default App;
