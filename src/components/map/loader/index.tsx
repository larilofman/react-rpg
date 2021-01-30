import React, { useEffect } from 'react';
import { ZoneType, ZoneStatus } from '../../../types';
import useGenerateMap from '../../../hooks/use-generate-map';
import { useDispatch } from 'react-redux';
import { SetMap } from '../../redux-state/reducers/zone/actions';

interface Props {
    loadedZone: ZoneType | undefined
    setLoadedZone: React.Dispatch<React.SetStateAction<ZoneType | undefined>>
    zoneStatus: ZoneStatus
}

const MapLoader: React.FC<Props> = ({ loadedZone, setLoadedZone, zoneStatus }) => {
    const dispatch = useDispatch();
    const { buildMap, generateMap } = useGenerateMap();

    useEffect(() => {
        if (loadedZone) {
            const tiles = loadedZone.tiles
                ? buildMap(loadedZone.tiles)
                : generateMap(loadedZone.size);
            const zone = {
                ...zoneStatus,
                size: loadedZone.size,
                tiles
            };
            dispatch(SetMap(zone));
            // setMap(zone);
            setLoadedZone(undefined);
        }
    }, [loadedZone]);

    return null;

};

const areEqual = (prevProps: Readonly<React.PropsWithChildren<Props>>, nextProps: Readonly<React.PropsWithChildren<Props>>) => {
    if (prevProps.loadedZone?.name !== nextProps.loadedZone?.name) return false;
    return true;
};

export default React.memo(MapLoader, areEqual);
