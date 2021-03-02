export enum ZoneEnvironment {
    Village,
    Dungeon
}

export interface ZoneType {
    environment: ZoneEnvironment
    floorSprite: number
    wallSprite: number
    numRandomRooms?: number
}