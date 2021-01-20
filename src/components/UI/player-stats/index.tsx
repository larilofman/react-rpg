import React from 'react';
import './style.css';
import HealthBar from '../health-bar';
import { useStateValue } from '../../state';
import { Faction } from '../../../types';

const PlayerStats: React.FC = () => {
    const [{ zoneData }] = useStateValue();

    if (!zoneData.creatures[Faction.Player].length) {
        return null;
    }

    const player = zoneData.creatures[Faction.Player][0];

    return (
        <div id="player-stats">
            <h3>{player.name}</h3>
            <HealthBar player={player} />
        </div>
    );
};

export default PlayerStats;