import { Dimensions, MapData, TileType, Tile, Position, WallTile, FloorTile } from '../../types';
import getRandomArbitrary from '../../utils/random-between-values';
import weightedRandom from '../../utils/weighted-random';

export default function useGenerateMap() {
    let mapSize: Dimensions = { w: 0, h: 0 };

    const generateRoomData = (numRooms: number, sizeMin: Dimensions, sizeMax: Dimensions) => {

        const rooms: { size: Dimensions, pos: Position }[] = [];

        for (let i = 0; i < numRooms; i++) {
            const height = getRandomArbitrary(sizeMin.h, sizeMax.h);
            const width = getRandomArbitrary(sizeMax.w, sizeMax.w);
            const yPos = getRandomArbitrary(1, mapSize.h - height);
            const xPos = getRandomArbitrary(1, mapSize.w - width);

            const room = {
                size: { h: height, w: width },
                pos: { x: xPos, y: yPos }
            };
            rooms.push(room);
        }

        return rooms;

    };

    const generateRooms = (numRooms = 5, sizeMin: Dimensions, sizeMax: Dimensions, tiles: Tile[][]) => {
        let wallTiles: Tile[] = [];

        const roomDatas = generateRoomData(numRooms, sizeMin, sizeMax);

        for (let i = 0; i < numRooms; i++) {

            const roomData = roomDatas[i];
            const room = generateRoom(roomData.size, roomData.pos, mapSize);
            wallTiles = wallTiles.concat(room);
        }

        wallTiles.forEach(tile => {
            tiles[tile.position.y][tile.position.x] = tile;
        });

        return tiles;
    };

    const generateRoom = (size: Dimensions, pos: Position, mapSize: Dimensions) => {
        const roomTiles: Tile[] = [];
        const nonCornerTiles: Tile[] = [];

        for (let y = pos.y; y < pos.y + size.h; y++) {
            for (let x = pos.x; x < pos.x + size.w; x++) {
                if (y === pos.y ||
                    x === pos.x ||
                    y === pos.y + size.h - 1 ||
                    x === pos.x + size.w - 1) {

                    const tile: WallTile = {
                        type: TileType.wall,
                        id: (mapSize.h * y) + x,
                        position: { x, y },
                        passable: false,
                        spriteIndex: weightedRandom(0, 7, 2)
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
        mapSize = size;
        const floorTiles = [];
        for (let y = 0; y < size.h; y++) {
            const row: Tile[] = [];
            for (let x = 0; x < size.w; x++) {
                const tile: FloorTile = {
                    type: TileType.floor,
                    passable: true,
                    id: (size.h * y) + x,
                    position: { x, y },
                    spriteIndex: weightedRandom(0, 8, 2)
                };
                row.push(tile);
            }
            floorTiles.push(row);
        }
        const allTiles = generateRooms(2, { w: 5, h: 5 }, { w: 10, h: 10 }, floorTiles);
        return (
            {
                tiles: allTiles,
                size
            }
        );
    };

    return {
        generateMap
    };
}