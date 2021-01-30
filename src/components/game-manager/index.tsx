import React, { useEffect, useState } from 'react';
import CreatureManager from '../creature/manager';
import MapManager from '../map/manager';
import { ZoneType } from '../../types';
import { loadZoneData, ZoneName } from '../../utils/load-data';
import ObjectManager from '../object-manager';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux-state/store/index';
import { SetMap } from '../redux-state/reducers/zone/actions';

const GameManager: React.FC = () => {
    const [loadedZone, setLoadedZone] = useState<ZoneType | undefined>();
    const dispatch = useDispatch();
    const { mapLoaded, visitedZones, zoneStatus } = useSelector((state: RootState) => (
        {
            mapLoaded: state.zone.mapLoaded,
            visitedZones: state.zone.visitedZones,
            zoneStatus: state.zone.status
        }
    ));

    useEffect(() => {

        if (!mapLoaded) {
            if (zoneStatus.tiles.length) { // A visited zone is loaded
                dispatch(SetMap(zoneStatus));
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
            <MapManager loadedZone={loadedZone} setLoadedZone={setLoadedZone} />
            <CreatureManager freshZone={freshZone} />
            <ObjectManager freshZone={freshZone} />
        </>
    );
};

export default GameManager;