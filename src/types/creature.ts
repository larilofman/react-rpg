import { Position } from "./general";

export interface CreatureType {
    name: string,
    stats: Stats,
    pos?: Position,
    sprite: string
}

export enum Faction {
    Player,
    Friendly,
    Hostile,
}

export interface Stats {
    health: number,
    maxHealth: number,
    damage: number
}

export interface BaseCreature {
    id: string,
    faction: Faction
}

export interface Creature extends BaseCreature {
    pos: Position,
    stats: Stats,
    name: string,
    sprite: string
}

export enum DamageType {
    Physical
}

export interface Attack {
    type: DamageType,
    damage: number
}