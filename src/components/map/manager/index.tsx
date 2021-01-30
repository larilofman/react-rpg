import React from 'react';
import { ZoneType } from '../../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store/index';
import MapLoader from '../loader';
import MapRenderer from '../renderer';

interface Props {
    loadedZone: ZoneType | undefined
    setLoadedZone: React.Dispatch<React.SetStateAction<ZoneType | undefined>>
}

const MapManager: React.FC<Props> = ({ loadedZone, setLoadedZone }) => {
    const { cameraPosition, zoneStatus, mapLoaded } = useSelector((state: RootState) => (
        {
            cameraPosition: state.cameraPosition,
            zoneStatus: state.zone.zoneStatus,
            mapLoaded: state.zone.mapLoaded
        }
    ));

    return (
        <>
            <MapLoader
                loadedZone={loadedZone}
                setLoadedZone={setLoadedZone}
                zoneStatus={zoneStatus}
            />
            <MapRenderer
                zoneTiles={zoneStatus.tiles}
                cameraPosition={cameraPosition}
                mapLoaded={mapLoaded}
            />
        </>
    );
};


export default MapManager;

