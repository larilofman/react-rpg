import React, { useEffect } from 'react';
import Container from '../container';
import UIHeaderContainer from '../ui-header-container';
import { useStateValue } from '../../state';
import { Faction, Position } from '../../../types';
import useDraggable from '../../../hooks/use-draggable';


const DevTools: React.FC = () => {
    const [{ zoneData }] = useStateValue();
    const { position, handleMouseDown, handleMouseOver } = useDraggable('dev-tools-header', { x: 50, y: 50 });

    // if (!zoneData.creatures[Faction.Player].length) {
    //     return null;
    // }

    // const player = zoneData.creatures[Faction.Player][0];
    // console.log(position);
    return (
        <div
            id="dev-tools"
            // width="200px"
            // height="100px"
            onMouseDown={handleMouseDown}
            style={{ position: "absolute", top: position.y, left: position.x, zIndex: 10 }}
        >
            <UIHeaderContainer id={'dev-tools-header'} b4 size="xx-large">Dev Tools</UIHeaderContainer>
            <Container p4 bnt4 height="100%">
            </Container>
        </div>
    );
};

export default DevTools;