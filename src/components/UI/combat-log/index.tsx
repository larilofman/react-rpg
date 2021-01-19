import React from 'react';
import Scrollbox from '../scrollbox';
import { useStateValue } from '../../state';
import './style.css';

const CombatLog: React.FC = () => {
    const [{ combatLog }] = useStateValue();

    return (
        <div>
            <h4 id="combat-log-label">Combat Log</h4>
            <Scrollbox
                id="combat-log"
                size={{ w: 340, h: 132 }}
                contents={combatLog}
                autoScroll={true}
            />
        </div>

    );
};

export default CombatLog;