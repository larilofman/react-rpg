import React from 'react';
import './style.css';
import HealthBar from '../health-bar';
import { useStateValue } from '../../state';
import { Faction } from '../../../types';
import Container from '../container';
import UIHeaderContainer from '../ui-header-container';

const PlayerStats: React.FC = () => {
    const [{ zoneData }] = useStateValue();

    if (!zoneData.creatures[Faction.Player].length) {
        return null;
    }

    const player = zoneData.creatures[Faction.Player][0];

    return (
        <Container height="100%">
            <UIHeaderContainer bnt4>{player.name}</UIHeaderContainer>
            <Container p4 bnt4 height="100%">
                <HealthBar player={player} />
            </Container>
        </Container>
    );
};

export default PlayerStats;