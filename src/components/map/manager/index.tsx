import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store/index';
import MapLoader from '../loader';
import MapRenderer from '../renderer';

const MapManager: React.FC = () => {
    const { cameraPosition, zoneName, tilesLoaded } = useSelector((state: RootState) => (
        {
            cameraPosition: state.cameraPosition,
            zoneName: state.game.currentZone,
            tilesLoaded: state.zone.tilesLoaded
        }
    ));

    return (
        <>
            <MapLoader
                tilesLoaded={tilesLoaded}
                zoneName={zoneName}
            />
            <MapRenderer
                cameraPosition={cameraPosition}
                tilesLoaded={tilesLoaded}
            />
        </>
    );
};


export default MapManager;

