import React, { useEffect } from 'react';
import { useStateValue } from '../../state';
import useFindRandomFloorTile from '../../../hooks/use-find-floor-tile';
import Npc from '..';
import { Creature, Faction } from '../../../types';
import useAddCreatures from '../../state/action-hooks/useAddCreatures';
import { nanoid } from 'nanoid';


const EnemyManager: React.FC = () => {
    const [{ zoneData, mapLoaded }] = useStateValue();
    const { findFloorTile } = useFindRandomFloorTile();
    const { addCreatures } = useAddCreatures();

    useEffect(() => {
        if (mapLoaded) {
            spawnEnemies();
        }

    }, [mapLoaded]);

    useEffect(() => {
        // const occupied = [];
        // for (let y = 0; y < zoneData.tiles.length; y++) {
        //     for (let x = 0; x < zoneData.tiles.length; x++) {
        //         if (zoneData.tiles[y][x].occupant) {
        //             occupied.push(zoneData.tiles[y][x]);
        //         }
        //     }
        // }
        // console.log(occupied);
        console.log(zoneData.creatures);
    }, [zoneData]);

    const spawnEnemies = () => {
        const enemies = [];
        for (let index = 0; index < 1; index++) {
            const enemy: Creature = { faction: Faction.Hostile, pos: findFloorTile().position, id: nanoid() };
            enemies.push(enemy);
        }
        addCreatures(enemies);
    };

    if (!mapLoaded || !zoneData.creatures) return null;

    return (
        <>
            {zoneData.creatures.map(e => (
                <Npc key={e.id} skin="e1" startPosition={e.pos} data={e} />
            ))}
        </>
    );


};

export default EnemyManager;