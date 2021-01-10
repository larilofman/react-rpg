import React from 'react';
import Player from './components/player';
import Npc from './components/npc';
import Map from './components/map';

const App = () => {

  return (
    <div className="zone-container" >
      <Player skin="f1" />
      <Npc skin="e1" />
      <Map />
    </div>
  );
};

export default App;
