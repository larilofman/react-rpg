import { Position } from "../../types/general";
import { TileType } from "../../types/tile";
import weightedRandom from "../weighted-random";

export const createTile = (pos: Position, passable: boolean, id: number, spriteURL: string, maxSpriteIndex: number) => {

    const tile: TileType = {
        passable,
        id,
        position: { x: pos.x, y: pos.y },
        spriteURL,
        spriteIndex: weightedRandom(0, maxSpriteIndex, 2)
    };
    return tile;
};