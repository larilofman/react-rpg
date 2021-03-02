import { Dimensions, TileType } from '../../types';
import { tileSprites } from '../../data/tile/tileSprites';
import { createTile } from './create-tile';
import { generateHouses } from './generate-houses';
import { ZoneType } from './types';

// Generate random map of given dimensions
export const generateMap = (size: Dimensions, zoneType: ZoneType): TileType[][] => {
    const floorTiles = [];
    for (let y = 0; y < size.h; y++) {
        const row: TileType[] = [];
        for (let x = 0; x < size.w; x++) {
            const tile = createTile(
                { x, y },
                true,
                (size.h * y) + x,
                tileSprites[zoneType.floorSprite].url,
                tileSprites[zoneType.floorSprite].variants
            );
            row.push(tile);
        }
        floorTiles.push(row);
    }

    const numRooms = zoneType.numRandomRooms;
    const roomWidth = numRooms ? size.w / numRooms : 5;
    const roomHeight = numRooms ? size.h / numRooms : 5;

    const tiles = generateHouses(
        zoneType.numRandomRooms,
        zoneType.wallSprite,
        { w: roomWidth, h: roomHeight },
        { w: roomWidth * 2, h: roomHeight * 2 },
        floorTiles,
        size);
    return (tiles);
};
