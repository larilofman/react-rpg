import React from 'react';
import Scrollbox from '../scrollbox';
import { useStateValue } from '../../state';

const CombatLog: React.FC = () => {
    const [{ combatLog }] = useStateValue();

    return (
        <div>
            <p>Combat Log</p>
            <Scrollbox
                id="combat-log"
                size={{ w: 300, h: 140 }}
                contents={combatLog}
                autoScroll={true}
            />
        </div>

    );
};

export default CombatLog;