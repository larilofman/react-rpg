import React, { useEffect } from 'react';
import Floor from '../tile/floor';
import Wall from '../tile/wall';
import { TileType, Tile, MapData, Position } from '../../types';
import { useStateValue } from '../state';
import useSetMap from '../state/action-hooks/useSetMap';
import useGenerateMap from '../../hooks/use-generate-map';

const Map: React.FC = () => {
    const [{ mapData, mapLoaded }] = useStateValue();
    const { setMap } = useSetMap();
    const mapTiles = require("../../data/maps/map0.json").tiles;
    const { generateMap } = useGenerateMap();

    // useEffect(() => {
    //     const _tiles = [];

    //     for (let y = 0; y < mapTiles.length; y++) {
    //         const row: Tile[] = [];
    //         for (let x = 0; x < mapTiles[0].length; x++) {
    //             const tile = {
    //                 type: mapTiles[y][x] === 1 ? TileType.floor : TileType.wall,
    //                 id: (mapTiles.length * y) + x,
    //                 position: { x, y },
    //                 passable: mapTiles[y][x] === 1 ? true : false
    //             };
    //             row.push(tile);
    //         }
    //         _tiles.push(row);
    //     }

    //     const mapData: MapData = {
    //         size: { h: mapTiles.length, w: mapTiles[0].length },
    //         tiles: _tiles
    //     };

    //     setMap(mapData);
    // }, [mapTiles]);
    useEffect(() => {
        if (!mapLoaded) {
            const map = generateMap({ h: 22, w: 31 });
            setMap(map);
        }
    }, [mapLoaded]);

    useEffect(() => {
        console.log('mapDataChanged', mapLoaded);
    }, [mapData]);

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

    if (!mapData.tiles) return null;

    return (
        <>
            {mapData.tiles.map((row, index) => (
                <div key={index}>
                    {row.map((tile) => {
                        return tileToRender(tile);
                    })}
                </div>
            ))}
        </>
    );
};

export default Map;

