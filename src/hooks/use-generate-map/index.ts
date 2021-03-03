import { Dimensions, Position, Rectangle } from '../../types/general';
import getRandomArbitrary from '../../utils/random-between-values';
import weightedRandom from '../../utils/weighted-random';
import { collisionWithAny } from '../../utils/collision';
import { tileSprites } from '../../data/tile/tileSprites';
import { TileType } from '../../types/tile';
import { ZoneData } from '../../types/zone';

export default function useGenerateMap() {

    const generateHouseData = (numHouses: number, sizeMin: Dimensions, sizeMax: Dimensions, mapSize: Dimensions) => {

        const houses: Rectangle[] = [];

        for (let i = 0; i < numHouses; i++) {

            // random size between the given boundaries
            // random position one tile from the edges of the map
            const createBounds = (sizeReduction = 0): Rectangle => {
                const h = getRandomArbitrary(sizeMin.h, sizeMax.h - sizeReduction);
                const w = getRandomArbitrary(sizeMax.w, sizeMax.w - sizeReduction);
                const y = getRandomArbitrary(1, mapSize.h - h);
                const x = getRandomArbitrary(1, mapSize.w - w);

                return { pos: { x, y }, size: { w, h } };
            };

            // create bounds for the house
            let bounds = createBounds();
            const houseGap = 1;

            // first house will never collide with another one
            if (houses.length === 0) {
                houses.push(bounds);
            } else if (collisionWithAny(bounds, houses, houseGap)) {
                const retries = 5;
                // if the house would collide with an existing one, retry again each time with a bit smaller house
                for (let r = 5; r > 0; r--) {
                    bounds = createBounds(retries - r);
                    if (!collisionWithAny(bounds, houses, houseGap)) {
                        houses.push(bounds);
                        break;
                    }
                }
            } else {
                houses.push(bounds);
            }
        }
        // return the positions and sizes of rectangles
        return houses;

    };

    const generateHouses = (numHouses = 5, sizeMin: Dimensions, sizeMax: Dimensions, tiles: TileType[][], mapSize: Dimensions) => {
        let wallTiles: TileType[] = [];

        // get positions and sizes for houses
        const houseDatas = generateHouseData(numHouses, sizeMin, sizeMax, mapSize);

        for (let i = 0; i < houseDatas.length; i++) {
            const houseData = houseDatas[i];
            // create walltiles based on the position and size of house data
            const house = generateHouse(houseData.size, houseData.pos, mapSize);
            wallTiles = wallTiles.concat(house);
        }

        wallTiles.forEach(tile => {
            tiles[tile.position.y][tile.position.x] = tile;
        });

        // return the tiles, some floortiles now changed into walls
        return tiles;
    };

    const generateHouse = (size: Dimensions, pos: Position, mapSize: Dimensions) => {
        const houseTiles: TileType[] = [];
        const nonCornerTiles: TileType[] = []; // flat walls of the house, used for finding a spot for door

        // go through the edges of rectangle and place walls on those 
        for (let y = pos.y; y < pos.y + size.h; y++) {
            for (let x = pos.x; x < pos.x + size.w; x++) {
                if (y === pos.y ||
                    x === pos.x ||
                    y === pos.y + size.h - 1 ||
                    x === pos.x + size.w - 1) {

                    const tile = createTile(
                        { x, y },
                        false,
                        (mapSize.h * y) + x,
                        tileSprites[1].url,
                        tileSprites[1].variants
                    );

                    houseTiles.push(tile);

                    // Find tiles that are not the corner pieces of the house's walls
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

        // get a random placement for a door, for now just removing it
        const doorTile = nonCornerTiles[Math.floor(Math.random() * nonCornerTiles.length)];
        const wallTiles = houseTiles.filter(t => t.id !== doorTile.id);

        return wallTiles;
    };

    const createTile = (pos: Position, passable: boolean, id: number, spriteURL: string, maxSpriteIndex: number) => {

        const tile: TileType = {
            passable,
            id,
            position: { x: pos.x, y: pos.y },
            spriteURL,
            spriteIndex: weightedRandom(0, maxSpriteIndex, 2)
        };
        return tile;
    };

    // Build map from given tiledata
    const buildMap = (map: ZoneData): TileType[][] => {
        const size = map.size;
        const tiles: TileType[][] = [];
        if (!map.tiles) return tiles;
        if (size.h) {
            for (let y = 0; y < size.h; y++) {
                const row: TileType[] = [];
                for (let x = 0; x < size.w; x++) {
                    const mapCharacter = map.tiles[y][x];
                    const tile = createTile(
                        { x, y },
                        mapCharacter === 0,
                        (size.h * y) + x,
                        tileSprites[mapCharacter].url,
                        tileSprites[mapCharacter].variants
                    );
                    row.push(tile);
                }
                tiles.push(row);
            }
        }
        return (tiles);
    };

    // Generate random map of given dimensions
    const generateMap = (size: Dimensions): TileType[][] => {
        const floorTiles = [];
        for (let y = 0; y < size.h; y++) {
            const row: TileType[] = [];
            for (let x = 0; x < size.w; x++) {
                const tile = createTile(
                    { x, y },
                    true,
                    (size.h * y) + x,
                    tileSprites[0].url,
                    tileSprites[0].variants
                );
                row.push(tile);
            }
            floorTiles.push(row);
        }

        const tiles = generateHouses(5, { w: 5, h: 5 }, { w: 10, h: 10 }, floorTiles, size);
        return (tiles);
    };
    return {
        buildMap, generateMap
    };
}