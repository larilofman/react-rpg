import React, { useEffect } from 'react';
import Floor from '../tile/floor';
import Wall from '../tile/wall';
import { TileType, Tile, ZoneType, ZoneData, Dimensions, Position } from '../../types';
import { useStateValue } from '../state';
import useSetMap from '../state/action-hooks/useSetMap';
import useGenerateMap from '../../hooks/use-generate-map';
import settings from '../../data/settings.json';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux-state/store/index';
import { SetMap } from '../redux-state/reducers/zone/actions';

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
    const { buildMap, generateMap } = useGenerateMap();

    return <MemoizedInnerMap
        loadedZone={loadedZone}
        setLoadedZone={setLoadedZone}
        zoneData={zoneData}
        buildMap={buildMap}
        generateMap={generateMap}
        mapLoaded={mapLoaded}
        cameraPosition={cameraPosition}
    />;
};

interface InnerProps extends Props {
    zoneData: ZoneData
    buildMap: (map: number[][]) => Tile[][]
    generateMap: (size: Dimensions) => Tile[][]
    mapLoaded: boolean
    cameraPosition: Position
}

const InnerMap: React.FC<InnerProps> = ({ loadedZone, setLoadedZone, zoneData, buildMap, generateMap, mapLoaded, cameraPosition }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (loadedZone) {
            const tiles = loadedZone.tiles
                ? buildMap(loadedZone.tiles)
                : generateMap(loadedZone.size);
            const zone = {
                ...zoneData,
                size: loadedZone.size,
                tiles
            };
            dispatch(SetMap(zone));
            // setMap(zone);
            setLoadedZone(undefined);
        }

    }, [loadedZone]);

    const tilesOnCamera = React.useMemo(() => {
        const cam_y = cameraPosition.y;
        const cam_x = cameraPosition.x;
        const tiles: Tile[] = [];
        // Get tiles visible on camera and two tiles to each direction to avoid flickering
        for (let y = cam_y - 2; y < cam_y + settings.displaySize.h + 2; y++) {
            for (let x = cam_x - 2; x < cam_x + settings.displaySize.w + 2; x++) {
                if (zoneData.tiles[y] && zoneData.tiles[y][x]) {
                    tiles.push(zoneData.tiles[y][x]);
                }
            }
        }
        // console.log('getting tiles');
        return tiles;
    }, [cameraPosition.x, cameraPosition.y, mapLoaded]
    );


    const tileToRender = (tile: Tile) => {
        switch (tile.type) {
            case TileType.floor:
                return <Floor key={tile.id} position={tile.position} spriteIndex={tile.spriteIndex} />;
            case TileType.wall:
                return <Wall key={tile.id} position={tile.position} spriteIndex={tile.spriteIndex} />;
            default:
                break;
        }
    };

    if (!zoneData.tiles.length) return null;

    return (
        <>
            {tilesOnCamera.map(t => {
                return tileToRender(t);
            })}
        </>
    );

};

const areEqual = (prevProps: Readonly<React.PropsWithChildren<InnerProps>>, nextProps: Readonly<React.PropsWithChildren<InnerProps>>) => {
    if (prevProps.cameraPosition.x !== nextProps.cameraPosition.x) return false;
    if (prevProps.cameraPosition.y !== nextProps.cameraPosition.y) return false;
    if (prevProps.loadedZone?.name !== nextProps.loadedZone?.name) return false;
    if (prevProps.mapLoaded !== nextProps.mapLoaded) return false;
    // console.log('nothing changed on map');
    return true;
};

const MemoizedInnerMap = React.memo(InnerMap, areEqual);


export default Map;

