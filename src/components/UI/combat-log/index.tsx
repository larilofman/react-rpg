import React from 'react';
import Scrollbox from '../scrollbox';
import Container from '../container';
import './style.css';
import UIHeaderContainer from '../ui-header-container';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store';

const CombatLog: React.FC = () => {
    const combatLog = useSelector((state: RootState) => state.combatLog);

    return (
        <Container height="100%">
            <UIHeaderContainer bnb4 center size="large">Combat Log</UIHeaderContainer>
            <Container bnt4 color="dark" height="100%" style={{ minHeight: "32px" }}> {/* for some reason setting small minHeight fixed the vertically expanding scrollbox*/}
                <Scrollbox
                    contents={combatLog.entries}
                    autoScroll={true}
                />
            </Container>
        </Container>


    );
};

export default CombatLog;