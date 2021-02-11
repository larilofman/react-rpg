import React from 'react';
import Container from '../../container';
import Text from '../../text';
import './style.css';

interface Props {
    label: string;
    onClick: React.MouseEventHandler<HTMLElement>;
    width?: number
    borderTop?: boolean
    borderBottom?: boolean
}

const MenuItemLabel: React.FC<Props> = ({ label, onClick, width, borderTop, borderBottom }) => {

    return (
        <Container br4 bl4 bb4={borderBottom} bt4={borderTop} p4 color="gunmetal" id={label} onClick={onClick} className="menu-label no-select" width={width}>
            <Text size="x-large" bold outline>
                {label}
            </Text>
        </Container>

    );
};


export default MenuItemLabel;