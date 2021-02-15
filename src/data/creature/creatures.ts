import { CreatureType } from "./types";

export const creatures: Record<string, CreatureType> = {
    Ghost:
    {
        name: "Ghost",
        stats: {
            health: 10,
            maxHealth: 10,
            damage: 3
        },
        sprite: "e1"
    },
    Ninja:
    {
        name: "Ninja",
        stats: {
            health: 20,
            maxHealth: 20,
            damage: 8
        },
        sprite: "m2"
    },
    DistressedMan:
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