import React from 'react';
import './style.css';
import CollapsedItem from '../menu-item-label';

interface Props {
    label: string;
    onClick: React.MouseEventHandler<HTMLElement>;
    borderTop?: boolean
    borderBottom?: boolean
    component: JSX.Element
}

const ExpandedItem: React.FC<Props> = ({ label, onClick, borderTop, borderBottom, component }) => {

    return (
        <div>
            <CollapsedItem
                label={label}
                onClick={onClick}
                borderTop={borderTop}
                borderBottom={borderBottom}
            />
            {component}
        </div>
    );
};


export default ExpandedItem;