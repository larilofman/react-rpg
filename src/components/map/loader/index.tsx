import React, { useEffect } from 'react';
import { ZoneData } from '../../../types';
import useGenerateMap from '../../../hooks/use-generate-map';
import { useDispatch, useStore } from 'react-redux';
import { SetCreaturesLoaded, SetTiles } from '../../redux-state/reducers/zone/actions';
import { loadZoneData, ZoneName } from '../../../utils/load-data';
import { RootState } from '../../redux-state/store';

interface Props {
    tilesLoaded: boolean
    zoneName: ZoneName
}

const MapLoader: React.FC<Props> = ({ tilesLoaded, zoneName }) => {
    const dispatch = useDispatch();
    const { buildMap, generateMap } = useGenerateMap();

    const zoneTiles = useStore<RootState>().getState().zone.tiles;

    useEffect(() => {
        if (!tilesLoaded) {
            if (zoneTiles.length) { // A visited zone is loaded
                dispatch(SetCreaturesLoaded(true));
                dispatch(SetTiles(zoneTiles));
            } else { // A fresh zone is loaded
                const zoneToLoad: ZoneData = loadZoneData(zoneName as ZoneName);
                if (zoneToLoad) {
                    const tiles = zoneToLoad.tiles
                        ? buildMap(zoneToLoad.tiles)
                        : generateMap(zoneToLoad.size);
                    dispatch(SetCreaturesLoaded(false));
                    dispatch(SetTiles(tiles));
                }
            }
        }
    });

    // useEffect(() => {

    // }, [zoneName]);

    return null;

};

const areEqual = (prevProps: Readonly<React.PropsWithChildren<Props>>, nextProps: Readonly<React.PropsWithChildren<Props>>) => {
    if (prevProps.zoneName !== nextProps.zoneName) return false;
    if (!nextProps.tilesLoaded) return false;
    return true;
};

export default React.memo(MapLoader, areEqual);

