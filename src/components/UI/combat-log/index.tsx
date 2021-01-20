import React from 'react';
import Scrollbox from '../scrollbox';
import { useStateValue } from '../../state';
import Text from '../text';
import Container from '../container';
import './style.css';

const CombatLog: React.FC = () => {
    const [{ combatLog }] = useStateValue();

    return (
        <Container height="200px">
            <Text size="large" bold className={"combat-log-label"}>Combat Log</Text>
            <Scrollbox
                size={{ width: "100%", height: 132 }}
                contents={combatLog}
                autoScroll={true}
            />
        </Container>

    );
};

export default CombatLog;