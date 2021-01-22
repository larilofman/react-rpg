import React, { CSSProperties } from 'react';
import Text from '../text';
import Container from '../container';

interface Props extends React.HTMLAttributes<HTMLElement> {
    size?: "large" | "x-large" | "xx-large"
    center?: boolean
    b4?: boolean
    bnt4?: boolean
    id?: string
}

const UIHeaderContainer: React.FC<Props> = ({ size, style, b4, bnt4, center, id, children, onMouseDown }) => {
    return (
        <Container onMouseDown={onMouseDown} id={id} style={style} color="gunmetal" p4 bnt4={bnt4} b4={b4} vcenter height="32px">
            <Text center={center} size={size || "xx-large"} bold outline>{children}</Text>
        </Container>
    );
};

export default UIHeaderContainer;