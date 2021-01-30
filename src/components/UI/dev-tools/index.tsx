import React, { useState, useEffect } from 'react';
import Container from '../container';
import UIHeaderContainer from '../ui-header-container';
import useDraggable from '../../../hooks/use-draggable';
import Button from '../button';
import Select from '../select';
import { getAllZoneNames, ZoneName } from '../../../utils/load-data';
import useLoadZone from '../../../hooks/use-load-zone';
import './style.css';
import useAddVisitedZone from '../../../hooks/use-add-visited-zone';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store';


const DevTools: React.FC = () => {
    const { zoneName, visitedZones } = useSelector((state: RootState) => ({ zoneName: state.zone.zoneStatus.name, visitedZones: state.zone.visitedZones }));
    const { position, handleMouseDown } = useDraggable('dev-tools-header', { x: 16, y: 16 });
    const [selectedZone, setSelectedZone] = useState<string>(zoneName as ZoneName);
    const [savedZones, setSavedZones] = useState<string[]>([]);
    const [selectedSave, setSelectedSave] = useState<string>();
    const [zoneNames] = useState<string[]>(getAllZoneNames());
    const { loadZone, } = useLoadZone();
    const { addVisitedZone } = useAddVisitedZone();

    const handleZoneChangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loadZone(selectedZone as ZoneName);
    };

    const handleSavedZoneChangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loadZone(selectedSave as ZoneName, false);
    };

    useEffect(() => {
        console.log('set visitedZones', visitedZones);
        setSavedZones(visitedZones.map(z => z.name));
    }, [visitedZones.length]);

    return (
        <Container
            id="dev-tools"
            width="200px"
            height="400px"
            style={{ position: "absolute", top: position.y, left: position.x, zIndex: 10 }}
        >
            <UIHeaderContainer onMouseDown={handleMouseDown} id={'dev-tools-header'} b4 size="xx-large">Dev Tools</UIHeaderContainer>
            <Container color="dark-brown" p4 bnt4 height="100%" style={{ justifyContent: "space-between" }}>
                <form onSubmit={handleZoneChangeSubmit} id="dev-tools-map-form">
                    <Select onChange={(zone) => setSelectedZone(zone as ZoneName)} width="80%" label="Load zone" initialOption={selectedZone} options={zoneNames} />
                    <Button color="light" p4 m4 align width="60%" type="submit">
                        Load zone
                </Button>
                </form>
                <form onSubmit={handleSavedZoneChangeSubmit} id="dev-tools-map-form">
                    <Select onChange={(zone) => setSelectedSave(zone as ZoneName)} initialOption={selectedSave} width="80%" label="Load save" options={savedZones} />
                    <Button color="light" p4 m4 align width="60%" type="submit">
                        Load zone
                </Button>
                </form>
                <Container align>
                    <Button p4 m4 align width="80%" color="light-brown" onClick={addVisitedZone}>
                        Save ZoneStatus
                </Button>
                </Container>

            </Container>
        </Container>
    );
};

export default DevTools;