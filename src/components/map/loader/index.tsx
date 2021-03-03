import React, { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { SetTiles } from '../../redux-state/reducers/zone/actions';
import { loadZoneData } from '../../../utils/load-data';
import { RootState } from '../../redux-state/store';
import { buildMap } from '../../../utils/map/build-map';
import { generateMap } from '../../../utils/map/generate-map';
import { ZoneData } from '../../../types/zone';
import { ZoneName } from '../../../data/zones';

interface Props {
    tilesLoaded: boolean
    zoneName: ZoneName
}

const MapLoader: React.FC<Props> = ({ tilesLoaded, zoneName }) => {
    const dispatch = useDispatch();
    const visitedZones = useStore<RootState>().getState().game.visitedZones;

    useEffect(() => {
        if (!tilesLoaded) {
            const visitedZone = visitedZones.find(z => z.name === zoneName);
            if (visitedZone) { // A visited zone is loaded
                dispatch(SetTiles(visitedZone.tiles));
            } else { // A fresh zone is loaded
                const zoneToLoad: ZoneData = loadZoneData(zoneName as ZoneName);
                if (zoneToLoad) {
                    const tiles = zoneToLoad.tiles
                        ? buildMap(zoneToLoad)
                        : generateMap(zoneToLoad.size, zoneToLoad.zoneType);
                    dispatch(SetTiles(tiles));
                }
            }
        }
    });

    return null;

};

const areEqual = (prevProps: Readonly<React.PropsWithChildren<Props>>, nextProps: Readonly<React.PropsWithChildren<Props>>) => {
    if (!nextProps.tilesLoaded) return false;
    return true;
};

export default React.memo(MapLoader, areEqual);

