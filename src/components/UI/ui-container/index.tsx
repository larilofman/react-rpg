import React from 'react';
import './style.css';
import CombatLog from '../combat-log';
import PlayerStats from '../player-stats';
import InfoMessageBox from '../info-message-box';
import { displaySize, tileSize } from '../../../data/settings/general';


const UiContainer: React.FC = () => {
    const width = displaySize.w * tileSize.w + 8; // add borders to width
    const height = 256;

    return (
        <div id="ui-container-outer">
            <InfoMessageBox />
            <div id="ui-container-inner" style={{ width, height }}>
                <PlayerStats />
                <CombatLog />
            </div>
        </div>

    );
};

export default UiContainer;