import React, { useEffect } from 'react';
import Floor from '../tile/floor';
import Wall from '../tile/wall';
import { TileType, Tile, ZoneType } from '../../types';
import { useStateValue } from '../state';
import useSetMap from '../state/action-hooks/useSetMap';
import useGenerateMap from '../../hooks/use-generate-map';
import { loadZoneData, ZoneName } from '../../utils/load-zone-data';


const Map: React.FC = () => {
    const [{ zoneData, mapLoaded, cameraPosition, displaySize, visitedZones }] = useStateValue();
    const { setMap } = useSetMap();
    const { buildMap, generateMap } = useGenerateMap();

    useEffect(() => {
        if (!mapLoaded) {
            const visitedZone = visitedZones.find(z => z.name === zoneData.name);
            if (visitedZone) {
                setMap(visitedZone);
                return;
            }
            // console.log(visitedZones);
            const zoneToLoad: ZoneType = loadZoneData(zoneData.name as ZoneName);
            if (zoneToLoad) {
                if (zoneToLoad.tiles) {
                    buildMapFromData(zoneToLoad); // static maps
                } else {
                    generateMapFromSize(zoneToLoad); // randomly generated maps
                }
            }
        }
    }, [mapLoaded]);

    const buildMapFromData = (zoneToLoad: ZoneType) => {
        if (zoneToLoad.tiles) {
            const tiles = buildMap(zoneToLoad.tiles);
            const zone = {
                ...zoneData,
                size: zoneToLoad.size,
                tiles
            };
            setMap(zone);
        }
    };

    const generateMapFromSize = (zoneToLoad: ZoneType) => {
        const tiles = generateMap(zoneToLoad.size);
        const zone = {
            ...zoneData,
            size: zoneToLoad.size,
            tiles
        };
        setMap(zone);
    };

    // useEffect(() => {
    //     console.log('zoneDataChanged', mapLoaded);
    // }, [zoneData]);

    const tilesOnCamera = () => {
        const cam_y = cameraPosition.y;
        const cam_x = cameraPosition.x;
        const tiles: Tile[] = [];
        // Get tiles visible on camera and two tiles to each direction to avoid flickering
        for (let y = cam_y - 2; y < cam_y + displaySize.h + 2; y++) {
            for (let x = cam_x - 2; x < cam_x + displaySize.w + 2; x++) {
                if (zoneData.tiles[y] && zoneData.tiles[y][x]) {
                    tiles.push(zoneData.tiles[y][x]);
                }
            }
        }
        return tiles;
    };

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

    if (!zoneData.tiles) return null;
    return (
        <>
            {tilesOnCamera().map(t => {
                return tileToRender(t);
            })}
        </>
    );
    // return (
    //     <>
    //         {zoneData.tiles.map((row, index) => (
    //             <div key={index}>
    //                 {row.map((tile) => {
    //                     return tileToRender(tile);
    //                 })}
    //             </div>
    //         ))}
    //     </>
    // );
};

export default Map;

