import React, { useEffect, useState } from 'react';
import Container from '../container';
import UIHeaderContainer from '../ui-header-container';
import useDraggable from '../../../hooks/use-draggable';
import Button from '../button';
import Select from '../select';
import { getAllZoneNames, ZoneName } from '../../../utils/load-zone-data';
import useLoadZone from '../../state/action-hooks/useLoadZone';
import { useStateValue } from '../../state';
import './style.css';


const DevTools: React.FC = () => {
    const [{ zoneData }] = useStateValue();
    const { position, handleMouseDown } = useDraggable('dev-tools-header', { x: 16, y: 16 });
    const [selectedZone, setSelectedZone] = useState<string>(zoneData.name as ZoneName);
    const [zoneNames] = useState<string[]>(getAllZoneNames());
    const { loadZone } = useLoadZone();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loadZone(selectedZone as ZoneName);
    };

    return (
        <Container
            id="dev-tools"
            width="200px"
            height="400px"
            style={{ position: "absolute", top: position.y, left: position.x, zIndex: 10 }}
        >
            <UIHeaderContainer onMouseDown={handleMouseDown} id={'dev-tools-header'} b4 size="xx-large">Dev Tools</UIHeaderContainer>
            <Container color="dark-brown" p4 bnt4 height="100%" align>
                <form onSubmit={handleSubmit} id="dev-tools-map-form">
                    <Select onChange={(zone) => setSelectedZone(zone as ZoneName)} width="80%" label="Load zone" initialOption={selectedZone} options={zoneNames} />
                    <Button color="light" p4 m4 align width="60%" type="submit">
                        Load zone
                </Button>
                </form>

            </Container>
        </Container>
    );
};

export default DevTools;