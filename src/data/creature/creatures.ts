import { CreatureType } from "./types";

export const creatures: Record<string, CreatureType> = {
    female1:
    {
        stats: {
            health: 100,
            maxHealth: 100,
            damage: 5
        },
        name: "Player",
        sprite: "f1"
    },
    ghost:
    {
        name: "Ghost",
        stats: {
            health: 10,
            maxHealth: 10,
            damage: 3
        },
        sprite: "e1"
    },
    ninja:
    {
        name: "Ninja",
        stats: {
            health: 20,
            maxHealth: 20,
            damage: 8
        },
        sprite: "m2"
    },
    distressedMan:
    {
        name: "Distressed Man",
        stats: {
            health: 20,
            maxHealth: 30,
            damage: 10
        },
        sprite: "m1"
    }
};