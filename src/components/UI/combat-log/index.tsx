import React from 'react';
import Scrollbox from '../scrollbox';
import { useStateValue } from '../../state';
import './style.css';

const CombatLog: React.FC = () => {
    const [{ combatLog }] = useStateValue();

    return (
        <div id="combat-log">
            <h4 id="combat-log-label">Combat Log</h4>
            <Scrollbox
                size={{ width: "100%", height: 132 }}
                contents={combatLog}
                autoScroll={true}
            />
        </div>

    );
};

export default CombatLog;