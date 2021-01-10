import { Dimensions, MapData, TileType, Tile, Position } from '../../types';

export default function useGenerateMap() {

    const generateRoom = (size: Dimensions, mapSize: Dimensions, pos: Position, tiles: Tile[][]) => {
        // const tiles = [];
        // for (let y = pos.y; y < pos.y + size.w; y++) {
        //     const row: Tile[] = [];
        //     for (let x = pos.x; x < pos.x + size.h; x++) {
        //         if (y === pos.y || x === pos.x) {

        //             const tile = {
        //                 type: TileType.wall,
        //                 id: (size.h * y) + x,
        //                 position: { x, y },
        //                 passable: false
        //             };

        //             row.push(tile);
        //         }

        //     }
        //     tiles.push(row);
        // }

        const nonCornerTiles = [];

        for (let y = pos.y; y < pos.y + size.w; y++) {
            for (let x = pos.x; x < pos.x + size.h; x++) {
                if (y === pos.y ||
                    x === pos.x ||
                    y === pos.y + size.h - 1 ||
                    x === pos.x + size.w - 1) {

                    const tile = {
                        type: TileType.wall,
                        id: (size.h * y) + x,
                        position: { x, y },
                        passable: false
                    };

                    tiles[y][x] = tile;

                    if (!(y === pos.y && x === pos.x) &&
                        !(y === pos.y && x === pos.x + size.w - 1) &&
                        !(x === pos.x && y === pos.y + size.h - 1) &&
                        !(y === pos.y + size.h - 1 && x === pos.x + size.w - 1)
                    ) {
                        const nonCornerTile = {
                            position: { x, y }
                        };
                        nonCornerTiles.push(nonCornerTile);
                    }
                }

            }
        }

        const doorTile = nonCornerTiles[Math.floor(Math.random() * nonCornerTiles.length)];
        tiles[doorTile.position.y][doorTile.position.x] = {
            ...tiles[doorTile.position.y][doorTile.position.x],
            type: TileType.floor,
            passable: true
        };
        console.log(nonCornerTiles);

        return tiles;
    };

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
                    passable: true,
                    id: (size.h * y) + x,
                    position: { x, y },
                };
                row.push(tile);
            }
            tiles.push(row);
        }
        const tiles2 = generateRoom({ w: 5, h: 5 }, size, { x: 1, y: 1 }, tiles);
        return (
            {
                tiles: tiles2,
                size
            }
        );
    };

    return {
        generateMap
    };
}