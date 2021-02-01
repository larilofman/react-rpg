import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store/index';
import MapLoader from '../loader';
import MapRenderer from '../renderer';

const MapManager: React.FC = () => {
    const { cameraPosition, zoneName, zoneTiles, tilesLoaded, zoneRouteUsed } = useSelector((state: RootState) => (
        {
            cameraPosition: state.cameraPosition,
            zoneName: state.zone.name,
            zoneTiles: state.zone.tiles,
            tilesLoaded: state.zone.tilesLoaded,
            zoneRouteUsed: state.zone.zoneRouteUsed
        }
    ));

    return (
        <>
            <MapLoader
                tilesLoaded={tilesLoaded}
                zoneName={zoneName}
                zoneTiles={zoneTiles}
                zoneRouteUsed={zoneRouteUsed}
            />
            <MapRenderer
                zoneTiles={zoneTiles}
                cameraPosition={cameraPosition}
                tilesLoaded={tilesLoaded}
            />
        </>
    );
};


export default MapManager;

