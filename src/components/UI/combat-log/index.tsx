import React from 'react';
import Scrollbox from '../scrollbox';
import Container from '../container';
import './style.css';
import UIHeaderContainer from '../ui-header-container';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store';

const CombatLog: React.FC = () => {
    const combatLogEntries = useSelector((state: RootState) => state.messages.combatLogEntries);

    return (
        <Container height="100%">
            <UIHeaderContainer br4 bt4 bb4 bl2 center size="large">Combat Log</UIHeaderContainer>
            <Container br4 bb4 bl2 color="dark" height="100%" style={{ minHeight: "32px" }}> {/* for some reason setting small minHeight fixed the vertically expanding scrollbox*/}
                <Scrollbox
                    contents={combatLogEntries}
                    autoScroll={true}
                />
            </Container>
        </Container>


    );
};

export default CombatLog;