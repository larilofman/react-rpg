import React from 'react';
import './style.css';
import CombatLog from '../combat-log';
import PlayerStats from '../player-stats';
import { Dimensions } from '../../../types';
import Instructions from '../instructions';
import Container from '../container';
import { gameName } from '../../../data/settings/general.json';
import Text from '../text';

interface Props {
    size: Dimensions
}

const UiContainer: React.FC<Props> = ({ size }) => {
    return (
        <div id="ui-container-outer">
            <Container bl4 br4 p4 color="dark-brown">
                <Text size="large">{`Welcome to ${gameName}!`}</Text>
            </Container>
            <div id="ui-container-inner" style={{ width: size.w, height: size.h }}>
                <PlayerStats />
                <CombatLog />
                <Instructions />
            </div>
        </div>

    );
};

export default UiContainer;