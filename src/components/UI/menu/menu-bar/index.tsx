import React, { useState } from 'react';
import UIHeaderContainer from '../../ui-header-container';
import useDraggable from '../../../../hooks/use-draggable';
import './style.css';
import MenuItemLabel from '../menu-item-label';
import Instructions from '../instructions';
import DevTools from '../dev-tools';
import ExpandedItem from '../expanded-item';

const Menu: React.FC = () => {
    const { position, handleMouseDown } = useDraggable('menu-header', { x: 16, y: 16 });
    const [openItem, setOpenItem] = useState<number>();

    const menuItems = [
        {
            id: 1,
            label: "Instructions",
            component: <Instructions />
        },
        {
            id: 2,
            label: "Dev tools",
            component: <DevTools />
        }
    ];

    const baseWidth = 150;

    return (
        <div
            id="menu-container"
            style={{ top: position.y, left: position.x }}
        >
            <UIHeaderContainer
                onMouseDown={handleMouseDown}
                id={'menu-header'}
                bnb4
                size="xx-large"
                center
                width={baseWidth}
                className="no-select"
                color="dark-brown"
            >
                Menu
                </UIHeaderContainer>
            {menuItems.map(item =>
                openItem === item.id
                    ?
                    <div key={item.id}>
                        <ExpandedItem
                            component={item.component}
                            label={item.label}
                            onClick={() => setOpenItem(undefined)}
                            borderBottom={true}
                            borderTop={true}
                        />
                    </div>
                    : <MenuItemLabel
                        width={baseWidth}
                        key={item.id}
                        label={item.label}
                        onClick={() => setOpenItem(item.id)}
                        // child is selected or last   
                        borderBottom={item.id === openItem || item.id === menuItems.length}
                        // child is selected or first, or there is no item open, or open item isn't right above child
                        borderTop={item.id === openItem || item.id === 1 || !openItem || openItem !== item.id - 1}
                    />

            )}
        </div>
    );
};

export default Menu;