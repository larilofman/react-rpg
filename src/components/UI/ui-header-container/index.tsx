import React, { CSSProperties } from 'react';
import Text from '../text';
import Container from '../container';

interface Props {
    size?: "large" | "x-large" | "xx-large"
    style?: CSSProperties | undefined
    center?: boolean
}

const UIHeaderContainer: React.FC<Props> = ({ size, style, center, children }) => {
    return (
        <Container style={style} color="gunmetal" p4 bnt4 vcenter height="32px">
            <Text center={center} size={size || "xx-large"} bold outline>{children}</Text>
        </Container>
    );
};

export default UIHeaderContainer;