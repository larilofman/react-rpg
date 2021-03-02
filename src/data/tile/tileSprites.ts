interface TileSprite {
    url: string,
    variants: number
}

interface TileSpriteMap {
    [key: number]: TileSprite
}

export const tileSprites: TileSpriteMap = {
    0: {
        url: "floor/sand/floor_sand_stone",
        variants: 8
    },
    1: {
        url: "wall/vines/wall_vines",
        variants: 7
    },
    2: {
        url: "wall/catacombs/catacombs",
        variants: 16
    }
};