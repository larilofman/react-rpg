import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store/index';
import MapLoader from '../loader';
import MapRenderer from '../renderer';

const MapManager: React.FC = () => {
    const { cameraPosition, zoneName, zoneTiles, zoneLoaded } = useSelector((state: RootState) => (
        {
            cameraPosition: state.cameraPosition,
            zoneName: state.zone.name,
            zoneTiles: state.zone.tiles,
            zoneLoaded: state.zone.zoneLoaded
        }
    ));

    return (
        <>
            <MapLoader
                zoneLoaded={zoneLoaded}
                zoneName={zoneName}
                zoneTiles={zoneTiles}
            />
            <MapRenderer
                zoneTiles={zoneTiles}
                cameraPosition={cameraPosition}
                zoneLoaded={zoneLoaded}
            />
        </>
    );
};


export default MapManager;

