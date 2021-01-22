import React from 'react';
import Scrollbox from '../scrollbox';
import { useStateValue } from '../../state';
import Container from '../container';
import './style.css';
import UIHeaderContainer from '../ui-header-container';

const CombatLog: React.FC = () => {
    const [{ combatLog }] = useStateValue();

    return (
        <Container height="100%">
            <UIHeaderContainer bnt4 center size="large">Combat Log</UIHeaderContainer>
            <Container bnt4 color="dark" height="100%" style={{ minHeight: "32px" }}> {/* for some reason setting small minHeight fixed the vertically expanding scrollbox*/}
                <Scrollbox
                    contents={combatLog}
                    autoScroll={true}
                />
            </Container>
        </Container>


    );
};

export default CombatLog;