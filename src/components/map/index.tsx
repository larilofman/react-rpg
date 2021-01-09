import React, { useEffect, useState } from 'react';
import Floor from '../tile/floor';
import Wall from '../tile/wall';
import { TileType, Tile } from '../../types';

interface Props {
    map: number[][]
}


const Map: React.FC<Props> = ({ map }) => {
    const [tiles, setTiles] = useState<Tile[]>();



    useEffect(() => {
        const _tiles = [];

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[0].length; x++) {
                const tile = {
                    type: map[y][x] === 1 ? TileType.floor : TileType.wall,
                    id: (map.length * y) + x,
                    position: { x, y }
                };

                _tiles.push(tile);

            }
        }
        setTiles(_tiles);
    }, [map]);

    if (!tiles) return null;
    return (
        <>
            {tiles.map((t) => (
                t.type === TileType.floor
                    ?
                    <Floor position={t.position} collision={false} />
                    :
                    <Wall position={t.position} collision={true} />
            ))}
        </>
    );

    // return <Tile
    //     spriteData={{
    //         offset_x: 3,
    //         offset_y: 2,
    //         image: `/sprites/skins/grasslands_1.png`,
    //         layer: 0
    //     }}
    //     position={position}
    //     collision={collision}
    // />;

};

export default Map;

