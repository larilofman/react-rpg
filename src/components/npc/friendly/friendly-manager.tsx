import React, { useEffect } from 'react';
import { useStateValue } from '../../state';
import useFindRandomFloorTile from '../../../hooks/use-find-random-floor-tile';
import Npc from '..';
import { Creature, Faction } from '../../../types';
import useAddCreatures from '../../state/action-hooks/useAddCreatures';
import { nanoid } from 'nanoid';


const FriendlyManager: React.FC = () => {
    const [{ zoneData, mapLoaded }] = useStateValue();
    const { findRandomFloorTile } = useFindRandomFloorTile();
    const { addCreatures } = useAddCreatures();

    useEffect(() => {
        if (mapLoaded) {
            spawnFriendlies();
        }

    }, [mapLoaded]);

    const spawnFriendlies = () => {
        const enemies = [];
        for (let index = 0; index < 0; index++) {
            const enemy: Creature = {
                faction: Faction.Friendly,
                pos: findRandomFloorTile().position,
                id: nanoid(),
                stats: { health: 10, damage: 5 }
            };
            enemies.push(enemy);
        }
        addCreatures(enemies, Faction.Friendly);
    };

    if (!mapLoaded || !zoneData.creatures[Faction.Friendly]) return null;

    return (
        <>
            {zoneData.creatures[Faction.Friendly].map(e => (
                <Npc key={e.id} skin="m1" startPosition={e.pos} data={e} />
            ))}
        </>
    );


};

export default FriendlyManager;