import React, { useEffect } from 'react';
import { Tile, ZoneData } from '../../../types';
import useGenerateMap from '../../../hooks/use-generate-map';
import { useDispatch } from 'react-redux';
import { SetTiles } from '../../redux-state/reducers/zone/actions';
import { loadZoneData, ZoneName } from '../../../utils/load-data';


interface Props {
    zoneLoaded: boolean
    zoneTiles: Tile[][]
    zoneName: ZoneName
}

const MapLoader: React.FC<Props> = ({ zoneLoaded, zoneTiles, zoneName }) => {
    const dispatch = useDispatch();
    const { buildMap, generateMap } = useGenerateMap();

    useEffect(() => {
        if (!zoneLoaded) {
            if (zoneTiles.length) { // A visited zone is loaded
                dispatch(SetTiles(zoneTiles));
            } else { // A fresh zone is loaded
                const zoneToLoad: ZoneData = loadZoneData(zoneName as ZoneName);
                if (zoneToLoad) {
                    const tiles = zoneToLoad.tiles
                        ? buildMap(zoneToLoad.tiles)
                        : generateMap(zoneToLoad.size);
                    // const zone = {
                    //     ...zoneStatus,
                    //     size: zoneToLoad.size,
                    //     tiles
                    // };
                    dispatch(SetTiles(tiles));
                }
            }
        }
    });
    return null;

};

const areEqual = (prevProps: Readonly<React.PropsWithChildren<Props>>, nextProps: Readonly<React.PropsWithChildren<Props>>) => {
    if (prevProps.zoneName !== nextProps.zoneName) return false;
    if (!nextProps.zoneLoaded) return false;
    return true;
};

export default React.memo(MapLoader, areEqual);

