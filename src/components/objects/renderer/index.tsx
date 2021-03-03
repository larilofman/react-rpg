import React from 'react';
import { Position } from '../../../types/general';
import ZoneRoute from '../../static-object/zoneRoute';
import { useStore } from 'react-redux';
import { RootState } from '../../redux-state/store';
import { displaySize } from '../../../data/settings/general';
import { ZoneRouteType } from '../../../types/tile';

interface Props {
    cameraPosition: Position
    objectsLoaded: boolean
}

const ObjectRenderer: React.FC<Props> = ({ cameraPosition, objectsLoaded }) => {
    const zoneInteractableTiles = useStore<RootState>().getState().zone.interactableTiles;

    const objectsOnCamera = React.useMemo(() => {
        const cam_y = cameraPosition.y;
        const cam_x = cameraPosition.x;
        const objectsOnCam: ZoneRouteType[] = zoneInteractableTiles.filter(tile => (
            tile.position.x > cam_x - 2 &&
            tile.position.x < cam_x + displaySize.w + 2 &&
            tile.position.y > cam_y - 2 &&
            tile.position.y < cam_y + displaySize.h + 2
        ));

        return objectsOnCam;
    }, [cameraPosition.x, cameraPosition.y, objectsLoaded]);

    return (
        <>
            {objectsOnCamera.map(r => <ZoneRoute key={r.id} zoneRoute={r} />)}
        </>
    );
};

const areEqual = (prevProps: Readonly<React.PropsWithChildren<Props>>, nextProps: Readonly<React.PropsWithChildren<Props>>) => {
    if (prevProps.cameraPosition.x !== nextProps.cameraPosition.x) return false;
    if (prevProps.cameraPosition.y !== nextProps.cameraPosition.y) return false;
    if (prevProps.objectsLoaded !== nextProps.objectsLoaded) return false;
    return true;
};

export default React.memo(ObjectRenderer, areEqual);
