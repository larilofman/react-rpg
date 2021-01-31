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
    const { zoneLoaded, zoneName, zoneInteractableTiles } = useSelector((state: RootState) => (
        {
            zoneLoaded: state.zone.zoneLoaded,
            zoneName: state.zone.name,
            zoneInteractableTiles: state.zone.interactableTiles
        }
    ));
    const dispatch = useDispatch();

    useEffect(() => {
        if (zoneLoaded && freshZone()) {
            loadRoutes();
        }
    }, [zoneLoaded]);

    const loadRoutes = () => {
        const routesData = loadZoneData(zoneName).zoneRoutes;
        dispatch(AddInteractableTiles(routesData.map(route => ({ ...route, type: InteractableTileType.ZoneRoute }))));
    };

    return (
        <>
            {zoneInteractableTiles?.map(r => <ZoneRoute key={r.id} zoneRoute={r} />)}
        </>
    );
};

export default ObjectManager;
