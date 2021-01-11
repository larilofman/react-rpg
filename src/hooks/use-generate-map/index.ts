import { Dimensions, MapData, TileType, Tile, Position, WallTile, FloorTile } from '../../types';
import collision from '../../utils/collision';
import getRandomArbitrary from '../../utils/random-between-values';

export default function useGenerateMap() {

    const generateRoomData = (numRooms: number, mapSize: Dimensions) => {

        const rooms: { size: Dimensions, pos: Position }[] = [];

        for (let i = 0; i < numRooms; i++) {
            const height = getRandomArbitrary(3, 8);
            const width = getRandomArbitrary(3, 8);
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

    const generateRooms = (numRooms = 5, size: Dimensions, mapSize: Dimensions, pos: Position, tiles: Tile[][]) => {
        let wallTiles: Tile[] = [];

        const roomDatas = generateRoomData(numRooms, mapSize);

        for (let i = 0; i < numRooms; i++) {

            const roomData = roomDatas[i];
            // console.log(roomData);

            // console.log(roomData.size, roomData.pos);
            // const room = generateRoom({ h: roomData.size.h, w: roomData.size.w }, { x: roomData.pos.x, y: roomData.pos.y });
            const room = generateRoom(roomData.size, roomData.pos, mapSize);
            // const room = generateRoom({ h: 5, w: 5 }, { x: 1, y: 1 });
            wallTiles = wallTiles.concat(room);

            if (i === 1) {
                collision(roomData, roomData) ? console.log('collision') : console.log('no collision');
            }
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
        console.log(doorTile);
        console.log(roomTiles);

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