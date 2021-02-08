import React from 'react';
import Container from '../container';
import UIHeaderContainer from '../ui-header-container';
import useDraggable from '../../../hooks/use-draggable';
import Text from '../text';

const Instructions: React.FC = () => {
    const { position, handleMouseDown } = useDraggable('instructions-header', { x: 16, y: 532 });

    return (
        <Container
            id="instructions"
            width="500px"
            height="256px"
            style={{ position: "absolute", top: position.y, left: position.x, zIndex: 10 }}
        >
            <UIHeaderContainer onMouseDown={handleMouseDown} id={'instructions-header'} b4 size="xx-large">Instructions</UIHeaderContainer>
            <Container color="dark-brown" p4 bnt4 height="100%" style={{ justifyContent: "flex-start" }}>
                <Container style={{ marginBottom: "16px" }}>
                    <Text size="x-large" bold>
                        Movement
                </Text>
                    <Text size="large">
                        Use {<i><b>wasd</b></i>}, {<i><b>arrows</b></i>} or {<i><b>numpad</b></i>}(1, 3, 7 and 9 for diagonal movement) or {<i><b>click</b></i>} to move.
                </Text>
                </Container>
                <Container style={{ marginBottom: "16px" }}>
                    <Text size="x-large" bold>
                        Attacking
                </Text>
                    <Text size="large">
                        {<i><b>Move</b></i>} or {<i><b>click</b></i>} on an enemy to attack it.
                </Text>
                </Container>
                <Container>
                    <Text size="x-large" bold>
                        Interaction
                </Text>
                    <Text size="large">
                        Press {<i><b>e</b></i>} while standing on a portal to change zone.
                </Text>
                </Container>
            </Container>
        </Container>
    );
};

export default Instructions;