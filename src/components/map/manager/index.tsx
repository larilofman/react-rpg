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

const Map: React.FC<Props> = ({ loadedZone, setLoadedZone }) => {
    const { cameraPosition, zoneData, mapLoaded } = useSelector((state: RootState) => (
        {
            cameraPosition: state.cameraPosition,
            zoneData: state.zone.zoneData,
            mapLoaded: state.zone.mapLoaded
        }
    ));

    return (
        <>
            <MapLoader
                loadedZone={loadedZone}
                setLoadedZone={setLoadedZone}
                zoneData={zoneData}
            />
            <MapRenderer
                zoneTiles={zoneData.tiles}
                cameraPosition={cameraPosition}
            />
        </>
    );
};


export default Map;

