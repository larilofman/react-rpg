import React from 'react';
import './style.css';
import CombatLog from '../combat-log';
import PlayerStats from '../player-stats';
import { Dimensions } from '../../../types';
import Instructions from '../instructions';
import Container from '../container';
import InfoMessageBox from '../info-message-box';

interface Props {
    size: Dimensions
}

const UiContainer: React.FC<Props> = ({ size }) => {
    return (
        <div id="ui-container-outer">
            <InfoMessageBox />
            <div id="ui-container-inner" style={{ width: size.w, height: size.h }}>
                <PlayerStats />
                <CombatLog />
                <Instructions />
            </div>
        </div>

    );
};

export default UiContainer;