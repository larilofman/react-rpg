import { Position, Stats } from "../../types";

export interface CreatureType {
    name: string,
    stats: Stats,
    pos?: Position,
    sprite: string
}