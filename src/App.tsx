import React from 'react';
import Player from './components/player';
import Map from './components/map';

const App = () => {

  const map = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 2, 2],
    [1, 1, 1, 1, 1],
  ];
  return (
    <div className="zone-container" >
      <Player skin="f1" />
      <Map map={map} />
    </div>
  );
};

export default App;
