import React from 'react';
import './style.css';
import CombatLog from '../combat-log';
import PlayerStats from '../player-stats';
import { Dimensions } from '../../../types';

interface Props {
    size: Dimensions
}

const UiContainer: React.FC<Props> = ({ size }) => {
    return (
        <div id="ui-container" style={{ width: size.w, height: size.h }}>
            <PlayerStats />
            <CombatLog />
        </div>
    );
};

export default UiContainer;