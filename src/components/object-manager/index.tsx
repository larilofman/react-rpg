import React, { useEffect } from 'react';
import { InteractableTileType } from '../../types';
import { loadZoneData, ZoneName } from '../../utils/load-data';
import ZoneRoute from '../object/zoneRoute';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux-state/store';
import { AddInteractableTiles } from '../redux-state/reducers/zone/actions';

interface Props {
    freshZone: () => boolean
}

const ObjectManager: React.FC<Props> = ({ freshZone }) => {
    const { mapLoaded, zoneStatus } = useSelector((state: RootState) => (
        {
            mapLoaded: state.zone.mapLoaded,
            zoneStatus: state.zone.status
        }
    ));
    const dispatch = useDispatch();

    useEffect(() => {
        if (mapLoaded && freshZone()) {
            loadRoutes();
        }
    }, [mapLoaded]);

    const loadRoutes = () => {
        const routesData = loadZoneData(zoneStatus.name as ZoneName).zoneRoutes;
        dispatch(AddInteractableTiles(routesData.map(route => ({ ...route, type: InteractableTileType.ZoneRoute }))));
    };

    return (
        <>
            {zoneStatus.interactableTiles?.map(r => <ZoneRoute key={r.id} zoneRoute={r} />)}
        </>
    );
};

export default ObjectManager;
