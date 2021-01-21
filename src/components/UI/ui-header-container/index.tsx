import React, { CSSProperties } from 'react';
import Text from '../text';
import Container from '../container';

interface Props {
    size?: "large" | "x-large" | "xx-large"
    style?: CSSProperties | undefined
}

const UIHeaderContainer: React.FC<Props> = ({ size, style, children }) => {
    return (
        <Container color="gunmetal" p4 b4 bnt4 vcenter height="32px">
            <Text style={style} size={size || "xx-large"} bold outline>{children}</Text>
        </Container>
    );
};

export default UIHeaderContainer;