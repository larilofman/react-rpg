import React, { useEffect, useState } from 'react';
import Container from '../container';
import UIHeaderContainer from '../ui-header-container';
import { useStateValue } from '../../state';
import { Faction, Position } from '../../../types';
import useDraggable from '../../../hooks/use-draggable';
import Button from '../button';
import Select from '../select';
import { getAllZoneNames } from '../../../utils/load-zone-data';


const DevTools: React.FC = () => {
    const [{ zoneData }] = useStateValue();
    const { position, handleMouseDown } = useDraggable('dev-tools-header', { x: 16, y: 16 });
    const [zoneToLoad, setZoneToLoad] = useState<string | number>("");
    const [zoneNames, setZoneNames] = useState<string[]>(getAllZoneNames());


    useEffect(() => {
        console.log(getAllZoneNames());
    }, [zoneToLoad]);

    // const handleMapSelection = (map: string) => {
    //     console.log(map);
    // };
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
            <Container color="dark-brown" p4 bnt4 height="100%" align>
                <Select onChange={(zone) => setZoneToLoad(zone)} width="80%" label="Load map" initialOption={zoneNames[0]} options={zoneNames} />
                <Button color="light" p4 m4 align width="60%">
                    Load zone
                </Button>
            </Container>
        </Container>
    );
};

export default DevTools;