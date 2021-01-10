import React, { useEffect, useState } from 'react';
import Floor from '../tile/floor';
import Wall from '../tile/wall';
import { TileType, Tile, MapData } from '../../types';
import { useStateValue, setMap } from '../state';

const Map: React.FC = () => {
    const [tiles, setTiles] = useState<Tile[]>();
    const [, dispatch] = useStateValue();
    const mapTiles = require("../../data/maps/map0.json").tiles;

    useEffect(() => {
        const _tiles = [];

        for (let y = 0; y < mapTiles.length; y++) {
            for (let x = 0; x < mapTiles[0].length; x++) {
                const tile = {
                    type: mapTiles[y][x] === 1 ? TileType.floor : TileType.wall,
                    id: (mapTiles.length * y) + x,
                    position: { x, y },
                    passable: mapTiles[y][x] === 1 ? true : false
                };

                _tiles.push(tile);

            }
        }
        setTiles(_tiles);

        const mapData: MapData = {
            size: { h: mapTiles.length, w: mapTiles[0].length },
            tiles: _tiles
        };

        dispatch(setMap(mapData));
    }, [mapTiles]);

    if (!tiles) return null;
    return (
        <>
            {tiles.map((t) => (
                t.type === TileType.floor
                    ?
                    <Floor key={t.id} position={t.position} collision={false} />
                    :
                    <Wall key={t.id} position={t.position} collision={true} />
            ))}
        </>
    );
};

export default Map;

