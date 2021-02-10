import React from 'react';
import './style.css';
import Text from '../text';
import Container from '../container';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store';

const InfoMessageBox: React.FC = () => {
    const infoMessage = useSelector((state: RootState) => state.messages.infoMessage);
    return (
        <Container key={infoMessage} bl4 br4 p4 color="dark-brown" className={infoMessage ? "message-box-flash" : "message-box"}>
            <Text size="large" className={infoMessage ? "message-text-flash" : "message-text"}>{`${infoMessage}`}</Text>
        </Container>
    );
};

export default InfoMessageBox;