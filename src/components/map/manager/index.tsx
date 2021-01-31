import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store/index';
import MapLoader from '../loader';
import MapRenderer from '../renderer';

const MapManager: React.FC = () => {
    const { cameraPosition, zoneStatus, zoneLoaded } = useSelector((state: RootState) => (
        {
            cameraPosition: state.cameraPosition,
            zoneStatus: state.zone.status,
            zoneLoaded: state.zone.zoneLoaded
        }
    ));

    return (
        <>
            <MapLoader
                zoneLoaded={zoneLoaded}
                zoneStatus={zoneStatus}
            />
            <MapRenderer
                zoneTiles={zoneStatus.tiles}
                cameraPosition={cameraPosition}
                zoneLoaded={zoneLoaded}
            />
        </>
    );
};


export default MapManager;

