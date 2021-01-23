import React, { useEffect } from 'react';
import Container from '../container';
import UIHeaderContainer from '../ui-header-container';
import { useStateValue } from '../../state';
import { Faction, Position } from '../../../types';
import useDraggable from '../../../hooks/use-draggable';
import Button from '../button';
import Select from '../select';


const DevTools: React.FC = () => {
    const [{ zoneData }] = useStateValue();
    const { position, handleMouseDown } = useDraggable('dev-tools-header', { x: 16, y: 16 });

    // if (!zoneData.creatures[Faction.Player].length) {
    //     return null;
    // }

    // const player = zoneData.creatures[Faction.Player][0];
    // console.log(position);
    return (
        <Container
            id="dev-tools"
            width="200px"
            height="400px"
            style={{ position: "absolute", top: position.y, left: position.x, zIndex: 10 }}
        >
            <UIHeaderContainer onMouseDown={handleMouseDown} id={'dev-tools-header'} b4 size="xx-large">Dev Tools</UIHeaderContainer>
            <Container color="dark-brown" p4 bnt4 height="100%" justify align>
                <Select width="80%" label="Load map" options={["map0", "map1", "map2", "map3"]} />
                <Button color="light" p4 m4 align width="60%">
                    Spawn map
                </Button>
            </Container>
        </Container>
    );
};

export default DevTools;