import React from 'react';
import './style.css';
import HealthBar from '../health-bar';
import { Faction } from '../../../types';
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
            <UIHeaderContainer bnb4>{playerName}</UIHeaderContainer>
            <Container p4 bnt4 height="100%">
                <HealthBar />
            </Container>
        </Container>
    );
};

export default PlayerStats;