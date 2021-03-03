import React from 'react';
import './style.css';
import HealthBar from '../health-bar';
import { Faction } from '../../../types/creature';
import Container from '../container';
import UIHeaderContainer from '../ui-header-container';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store';

const PlayerStats: React.FC = () => {
    const { playerName } = useSelector((state: RootState) => (
        {
            playerName: state.zone.creatures[Faction.Player][0] ? state.zone.creatures[Faction.Player][0].name : state.game.player.name
        }));

    return (
        <Container height="100%">
            <UIHeaderContainer bl4 bt4 bb4 br2>{playerName}</UIHeaderContainer>
            <Container p4 bl4 bb4 br2 height="100%">
                <HealthBar />
            </Container>
        </Container>
    );
};

export default PlayerStats;