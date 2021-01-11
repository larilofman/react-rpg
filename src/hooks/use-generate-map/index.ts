import { Dimensions, MapData, TileType, Tile, Position, WallTile, FloorTile } from '../../types';

export default function useGenerateMap() {

    const generateRooms = (numRooms = 5, size: Dimensions, mapSize: Dimensions, pos: Position, tiles: Tile[][]) => {
        const rooms = [];

        const wallTiles = generateRoom({ w: 5, h: 5 }, { x: 1, y: 1 });
        wallTiles.forEach(tile => {
            tiles[tile.position.y][tile.position.x] = tile;
        });
        // wallTiles.forEach(row => {
        //     row.forEach(tile => {
        //         tiles[tile.position.y][tile.position.x] = tile;
        //     });
        // });
        // for (let y = 0; y < wallTiles.length; y++) {
        //     for (let x = 0; x < wallTiles[0].length; x++) {
        //         console.log(wallTiles[y][x]);
        //         tiles[y][x] = wallTiles[y][x];
        //     }
        // }

        return tiles;
    };

    const generateRoom = (size: Dimensions, pos: Position) => {
        const roomTiles: Tile[] = [];
        const nonCornerTiles: Tile[] = [];

        for (let y = pos.y; y < pos.y + size.w; y++) {
            for (let x = pos.x; x < pos.x + size.h; x++) {
                if (y === pos.y ||
                    x === pos.x ||
                    y === pos.y + size.h - 1 ||
                    x === pos.x + size.w - 1) {

                    const tile: WallTile = {
                        type: TileType.wall,
                        id: (size.h * y) + x,
                        position: { x, y },
                        passable: false
                    };

                    roomTiles.push(tile);

                    // Find tiles that are not the corner pieces of the room's walls
                    if (!(y === pos.y && x === pos.x) &&
                        !(y === pos.y && x === pos.x + size.w - 1) &&
                        !(x === pos.x && y === pos.y + size.h - 1) &&
                        !(y === pos.y + size.h - 1 && x === pos.x + size.w - 1)
                    ) {

                        nonCornerTiles.push(tile);
                    }
                }

            }
        }

        const doorTile = nonCornerTiles[Math.floor(Math.random() * nonCornerTiles.length)];
        const wallTiles = roomTiles.filter(t => t.id !== doorTile.id);

        return wallTiles;
    };

    const generateMap = (size: Dimensions): MapData => {
        const tiles = [];
        for (let y = 0; y < size.h; y++) {
            const row: Tile[] = [];
            for (let x = 0; x < size.w; x++) {
                const tile: FloorTile = {
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
        const tiles2 = generateRooms(2, { w: 5, h: 5 }, size, { x: 1, y: 1 }, tiles);
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