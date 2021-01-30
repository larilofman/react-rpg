import React from 'react';
import './style.css';
import HealthBar from '../health-bar';
import { Faction } from '../../../types';
import Container from '../container';
import UIHeaderContainer from '../ui-header-container';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store';

const PlayerStats: React.FC = () => {
    const player = useSelector((state: RootState) => state.zone.zoneStatus.creatures[Faction.Player][0]);

    if (!player) {
        return null;
    }

    return (
        <Container height="100%">
            <UIHeaderContainer bnb4>{player.name}</UIHeaderContainer>
            <Container p4 bnt4 height="100%">
                <HealthBar player={player} />
            </Container>
        </Container>
    );
};

export default PlayerStats;