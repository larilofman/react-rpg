import { Direction, Dimensions, MapData, TileType, Tile } from '../../types';
import randomEnum from '../../utils/random-enum';

export default function useGenerateMap() {

    const generateMap = (size: Dimensions): MapData => {
        const tiles = [];
        for (let y = 0; y < size.h; y++) {
            const row: Tile[] = [];
            for (let x = 0; x < size.w; x++) {
                const tile = {
                    // type: mapTiles[y][x] === 1 ? TileType.floor : TileType.wall,
                    // id: (mapTiles.length * y) + x,
                    // position: { x, y },
                    // passable: mapTiles[y][x] === 1 ? true : false
                    type: TileType.floor,
                    id: (size.h * y) + x,
                    position: { x, y },
                    passable: true
                };
                row.push(tile);
            }
            tiles.push(row);
        }
        return (
            {
                tiles,
                size
            }
        );
    };

    return {
        generateMap
    };
}