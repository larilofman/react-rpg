import React from 'react';
import Player from './components/player';
import Npc from './components/npc';
import Map from './components/map';
import { useStateValue } from './components/state';

const App = () => {
  const [{ mapData, tileSize }] = useStateValue();

  return (
    <div
      className="zone-container"
      style={{
        width: mapData.size.w * tileSize.w,
        height: mapData.size.h * tileSize.h
      }}>
      <Player skin="f1" />
      <Npc skin="e1" />
      <Map />
    </div>
  );
};

export default App;
