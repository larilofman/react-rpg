interface TileSprite {
    url: string,
    maxIndex: number
}

interface TileSpriteMap {
    [key: number]: TileSprite
}

export const tileSprites: TileSpriteMap = {
    0: {
        "url": "floor/sand/floor_sand_stone",
        "maxIndex": 8
    },
    1: {
        "url": "wall/vines/wall_vines",
        "maxIndex": 7
    },
    2: {
        "url": "wall/catacombs/catacombs",
        "maxIndex": 14
    }
};