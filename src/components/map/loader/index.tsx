import React, { useEffect } from 'react';
import { ZoneData, ZoneStatus } from '../../../types';
import useGenerateMap from '../../../hooks/use-generate-map';
import { useDispatch } from 'react-redux';
import { SetMap } from '../../redux-state/reducers/zone/actions';
import { loadZoneData, ZoneName } from '../../../utils/load-data';


interface Props {
    zoneLoaded: boolean
    zoneStatus: ZoneStatus
}

const MapLoader: React.FC<Props> = ({ zoneLoaded, zoneStatus }) => {
    const dispatch = useDispatch();
    const { buildMap, generateMap } = useGenerateMap();

    useEffect(() => {
        if (!zoneLoaded) {
            if (zoneStatus.tiles.length) { // A visited zone is loaded
                dispatch(SetMap(zoneStatus));
            } else { // A fresh zone is loaded
                const zoneToLoad: ZoneData = loadZoneData(zoneStatus.name as ZoneName);
                if (zoneToLoad) {
                    const tiles = zoneToLoad.tiles
                        ? buildMap(zoneToLoad.tiles)
                        : generateMap(zoneToLoad.size);
                    const zone = {
                        ...zoneStatus,
                        size: zoneToLoad.size,
                        tiles
                    };
                    dispatch(SetMap(zone));
                }
            }
        }
    });
    return null;

};

const areEqual = (prevProps: Readonly<React.PropsWithChildren<Props>>, nextProps: Readonly<React.PropsWithChildren<Props>>) => {
    if (prevProps.zoneStatus.name !== nextProps.zoneStatus.name) return false;
    if (!nextProps.zoneLoaded) return false;
    return true;
};

export default React.memo(MapLoader, areEqual);

