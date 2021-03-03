export interface Position {
    x: number,
    y: number
}

export interface Dimensions {
    w: number,
    h: number
}

export interface Rectangle {
    pos: Position,
    size: Dimensions
}

export enum Direction {
    down = 0,
    left = 1,
    right = 2,
    up = 3,
    upRight = 4,
    downRight = 5,
    downLeft = 6,
    upLeft = 7
}

export interface SpriteData {
    offset_x: number,
    offset_y: number,
    image: string,
    layer: number
}


