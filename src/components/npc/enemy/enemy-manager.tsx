import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../state';
import useFindRandomFloorTile from '../../../hooks/use-find-floor-tile';
import Npc from '..';
import { Creature, Faction } from '../../../types';
import { nanoid } from 'nanoid';


const EnemyManager: React.FC = () => {
    const [{ zoneData, mapLoaded }] = useStateValue();
    const { findFloorTile } = useFindRandomFloorTile();
    const [enemies, setEnemies] = useState<Creature[]>();

    useEffect(() => {
        if (mapLoaded) {
            spawnEnemies();
        }

    }, [mapLoaded]);

    // useEffect(() => {
    //     const occupied = [];
    //     for (let y = 0; y < zoneData.tiles.length; y++) {
    //         for (let x = 0; x < zoneData.tiles.length; x++) {
    //             if (zoneData.tiles[y][x].occupant) {
    //                 occupied.push(zoneData.tiles[y][x]);
    //             }
    //         }
    //     }
    //     console.log(occupied);
    // }, [zoneData]);

    const spawnEnemies = () => {
        const enemies = [];
        for (let index = 0; index < 1; index++) {
            const enemy: Creature = { faction: Faction.Hostile, pos: findFloorTile().position, id: nanoid() };
            enemies.push(enemy);
        }
        setEnemies(enemies);
    };

    if (!mapLoaded || !enemies) return null;

    return (
        <>
            {enemies.map(e => (
                <Npc key={e.id} skin="e1" startPosition={e.pos} data={e} />
            ))}
        </>
    );


};

export default EnemyManager;