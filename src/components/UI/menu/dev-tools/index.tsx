import React, { useState, useEffect } from 'react';
import Container from '../../container';
import Button from '../../button';
import Select from '../../select';
import { getAllZoneNames } from '../../../../utils/load-data';
import './style.css';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { RootState } from '../../../redux-state/store';
import { LoadSavedZone, LoadZone, RemoveVisitedZone, ResetPlayer, SavePlayer, SaveVisitedZone, SetGameOver } from '../../../redux-state/reducers/game/actions';
import { Faction } from '../../../../types/creature';
import { ZoneName } from '../../../../data/zones';

const DevTools: React.FC = () => {
    const { zoneName, visitedZones } = useSelector((state: RootState) => (
        {
            zoneName: state.zone.name,
            visitedZones: state.game.visitedZones,
        }));
    const player = useStore<RootState>().getState().zone.creatures[Faction.Player][0];
    const zoneStatus = useStore<RootState>().getState().zone;
    const dispatch = useDispatch();
    const [selectedZone, setSelectedZone] = useState<string>(zoneName as ZoneName);
    const [savedZones, setSavedZones] = useState<string[]>([]);
    const [selectedSave, setSelectedSave] = useState<string>();
    const [zoneNames] = useState<string[]>(getAllZoneNames());

    const handleZoneChangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(RemoveVisitedZone(selectedZone as ZoneName));
        dispatch(ResetPlayer());
        dispatch(LoadZone(selectedZone as ZoneName));
    };

    const handleSavedZoneChangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedSave) {
            dispatch(SetGameOver(false));
            dispatch(LoadSavedZone(selectedSave as ZoneName));
        }
    };

    const handleSaveZone = () => {
        dispatch(SavePlayer(player));
        dispatch(SaveVisitedZone(zoneStatus));
    };

    useEffect(() => {
        setSavedZones(visitedZones.map(z => z.name));
    }, [visitedZones.length]);

    return (
        <Container
            id="dev-tools"
            width="200px"
            height="400px"
        >
            <Container color="dark-brown" p4 bnt4 height="100%" style={{ justifyContent: "space-between" }}>
                <form onSubmit={handleZoneChangeSubmit} id="dev-tools-map-form">
                    <Select onChange={(zone) => setSelectedZone(zone as ZoneName)} width="80%" label="Load zone" initialOption={selectedZone} options={zoneNames} />
                    <Button color="light" p4 m4 align width="60%" type="submit">
                        Load zone
                </Button>
                </form>
                <form onSubmit={handleSavedZoneChangeSubmit} id="dev-tools-map-form">
                    <Select onChange={(zone) => setSelectedSave(zone as ZoneName)} width="80%" label="Load save" options={savedZones} />
                    <Button disabled={!selectedSave} color="light" p4 m4 align width="60%" type="submit">
                        Load save
                </Button>
                </form>
                <Container align>
                    <Button p4 m4 align width="80%" color="light-brown" onClick={handleSaveZone}>
                        Save zone
                </Button>
                </Container>

            </Container>
        </Container >
    );
};

export default DevTools;