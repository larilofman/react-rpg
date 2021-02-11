import React from 'react';
import Text from '../text';
import Container, { ContainerProps } from '../container';
import './style.css';

interface Props extends ContainerProps {
    size?: "large" | "x-large" | "xx-large"
    center?: boolean
    id?: string
}

const UIHeaderContainer: React.FC<Props> = ({ size, style, b4, center, id, children, ...props }) => {
    return (
        <Container

            id={id}
            style={style}
            color={props.color || "gunmetal"}
            p4
            b4={b4}
            justify
            height="32px"
            {...props}
        >
            <div id="ui-header-text-container">
                <Text center={center} size={size || "xx-large"} bold outline>{children}</Text>
            </div>

        </Container>
    );
};

export default UIHeaderContainer;