import React from 'react';
import Container from '../../container';
import Text from '../../text';

const Instructions: React.FC = () => {
    return (
        <Container
            id="instructions"
            width="530px"
        >
            <Container color="dark-brown" p4 bnt4 height="100%" style={{ justifyContent: "flex-start" }}>
                <Container style={{ marginBottom: "8px" }}>
                    <Text size="x-large" bold>
                        Movement
                </Text>
                    <Text size="large">
                        Use {<i><b>wasd</b></i>}, {<i><b>arrows</b></i>} or {<i><b>numpad</b></i>}(1, 3, 7 and 9 for diagonal movement) or {<i><b>click</b></i>} to move.
                        Press {<i><b>numpad 5</b></i>} or {<i><b>space bar</b></i>} or {<i><b>click</b></i>} on your character to skip turn.
                </Text>
                </Container>
                <Container style={{ marginBottom: "8px" }}>
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