import { tileSprites } from "../../data/tile/tileSprites";
import { TileType } from "../../types/tile";
import { ZoneData } from "../../types/zone";
import { createTile } from "./create-tile";

// Build map from given tiledata
export const buildMap = (map: ZoneData): TileType[][] => {
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