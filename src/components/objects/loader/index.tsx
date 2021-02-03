import React, { useEffect } from 'react';
import { InteractableTileType } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { SetObjects } from '../../redux-state/reducers/zone/actions';
import { loadZoneData, ZoneName } from '../../../utils/load-data';
import { RootState } from '../../redux-state/store';

interface Props {
    objectsLoaded: boolean
    zoneName: ZoneName
}

const ObjectLoader: React.FC<Props> = ({ objectsLoaded, zoneName }) => {
    const dispatch = useDispatch();
    const visitedZones = useSelector((state: RootState) => state.game.visitedZones);

    useEffect(() => {
        const visitedZone = visitedZones.find(z => z.name === zoneName);
        if (visitedZone) {
            dispatch(SetObjects(visitedZone.interactableTiles));
        } else {
            loadRoutes();
        }
    }, [objectsLoaded]);

    const loadRoutes = () => {
        const routesData = loadZoneData(zoneName).zoneRoutes;
        dispatch(SetObjects(routesData.map(route => (
            {
                ...route,
                type: InteractableTileType.ZoneRoute,
                popUpMessage: `Press 'e' to travel to ${route.linkedRoute.zoneName}`
            }
        ))));
    };

    return null;

};

const areEqual = (prevProps: Readonly<React.PropsWithChildren<Props>>, nextProps: Readonly<React.PropsWithChildren<Props>>) => {
    if (prevProps.zoneName !== nextProps.zoneName) return false;
    if (!nextProps.objectsLoaded) return false;
    return true;
};

export default React.memo(ObjectLoader, areEqual);