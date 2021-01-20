import React from 'react';
import './style.css';
import HealthBar from '../health-bar';
import { useStateValue } from '../../state';
import { Faction } from '../../../types';
import Text from '../text';
import Container from '../container';

const PlayerStats: React.FC = () => {
    const [{ zoneData }] = useStateValue();

    if (!zoneData.creatures[Faction.Player].length) {
        return null;
    }

    const player = zoneData.creatures[Faction.Player][0];

    return (
        <Container p4 b4 height="200px">
            <Text size="x-large" bold >{player.name}</Text>
            <HealthBar player={player} />
        </Container>
    );
};

export default PlayerStats;