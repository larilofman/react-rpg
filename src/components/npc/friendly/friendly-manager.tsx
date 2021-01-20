import React, { useEffect } from 'react';
import { useStateValue } from '../../state';
import useFindRandomFloorTile from '../../../hooks/use-find-random-floor-tile';
import Npc from '..';
import { BaseCreature, Creature, Faction } from '../../../types';
import useAddCreatures from '../../state/action-hooks/useAddCreatures';
import { nanoid } from 'nanoid';

interface Props {
    useTurn: (creature: BaseCreature) => void
}

const FriendlyManager: React.FC<Props> = ({ useTurn }) => {
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
        for (let index = 0; index < 1; index++) {
            const friendly: Creature = {
                faction: Faction.Friendly,
                pos: findRandomFloorTile().position,
                id: nanoid(),
                stats: { health: 10, maxHealth: 10, damage: 5 },
                name: 'Friendly'
            };
            enemies.push(friendly);
        }
        addCreatures(enemies, Faction.Friendly);
    };

    if (!mapLoaded || !zoneData.creatures[Faction.Friendly]) return null;

    return (
        <>
            {zoneData.creatures[Faction.Friendly].map(e => (
                <Npc key={e.id} skin="m1" startPosition={e.pos} data={e} useTurn={useTurn} stationary={true} />
            ))}
        </>
    );


};

export default FriendlyManager;