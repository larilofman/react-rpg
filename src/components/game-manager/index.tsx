import React, { useEffect, useState } from 'react';
import CreatureManager from '../npc/creature-manager';
import Map from '../map/manager';
import { ZoneType } from '../../types';
import useUseTurn from '../../hooks/use-use-turn';
import { loadZoneData, ZoneName } from '../../utils/load-data';
import ObjectManager from '../object-manager';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux-state/store/index';
import { SetMap } from '../redux-state/reducers/zone/actions';

const GameManager: React.FC = () => {
    const { useTurn } = useUseTurn();
    const [loadedZone, setLoadedZone] = useState<ZoneType | undefined>();
    const dispatch = useDispatch();
    const { mapLoaded, visitedZones, zoneStatus } = useSelector((state: RootState) => (
        {
            mapLoaded: state.zone.mapLoaded,
            visitedZones: state.zone.visitedZones,
            zoneStatus: state.zone.zoneStatus
        }
    ));

    useEffect(() => {

        if (!mapLoaded) {
            if (zoneStatus.tiles.length) { // A visited zone is loaded
                dispatch(SetMap(zoneStatus));
                return;
            } else { // A fresh zone is loaded
                const zoneToLoad: ZoneType = loadZoneData(zoneStatus.name as ZoneName);
                setLoadedZone(zoneToLoad);
            }
        }
    }, [mapLoaded]);

    const freshZone = () => {
        return !visitedZones.map(z => z.name).includes(zoneStatus.name);
    };

    return (
        <>
            <Map loadedZone={loadedZone} setLoadedZone={setLoadedZone} />
            <CreatureManager useTurn={useTurn} freshZone={freshZone} />
            <ObjectManager freshZone={freshZone} />
        </>
    );
};

export default GameManager;