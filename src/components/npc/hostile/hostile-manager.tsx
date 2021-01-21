import React, { useEffect } from 'react';
import { useStateValue } from '../../state';
import useFindRandomFloorTile from '../../../hooks/use-find-random-floor-tile';
import Npc from '..';
import { Creature, Faction, BaseCreature, CreatureType } from '../../../types';
import useAddCreatures from '../../state/action-hooks/useAddCreatures';
import { nanoid } from 'nanoid';
import enemies from '../../../data/enemy/enemies.json';
import { loadZoneData, ZoneType } from '../../../utils/load-zone-data';

type EnemyType = keyof typeof enemies;

interface Props {
    useTurn: (creature: BaseCreature) => void
}

const HostileManager: React.FC<Props> = ({ useTurn }) => {
    const [{ zoneData, mapLoaded }] = useStateValue();
    const { findRandomFloorTile } = useFindRandomFloorTile();
    const { addCreatures } = useAddCreatures();

    useEffect(() => {
        if (mapLoaded) {
            const enemiesToSpawn = getEnemiesToSpawn();
            spawnEnemies(enemiesToSpawn);
        }
    }, [mapLoaded]);

    const getEnemiesToSpawn = () => {
        const enemyData = loadZoneData(zoneData.name as ZoneType).creatures;
        const enemiesToSpawn: { creature: CreatureType, amount: number }[] = [];
        Object.values(enemyData).forEach(e => {
            enemiesToSpawn.push({ creature: enemies[e.name as EnemyType] as CreatureType, amount: e.amount });
        });

        return enemiesToSpawn;
    };

    const spawnEnemies = (enemiesToSpawn: { creature: CreatureType, amount: number }[]) => {
        const allEnemies: Creature[] = [];
        enemiesToSpawn.forEach(({ creature, amount }) => {
            for (let i = 0; i < amount; i++) {
                const enemy: Creature = {
                    faction: Faction.Hostile,
                    pos: findRandomFloorTile().position,
                    id: nanoid(),
                    stats: creature.stats,
                    name: creature.name,
                    sprite: creature.sprite
                };
                allEnemies.push(enemy);
            }

        });
        addCreatures(allEnemies, Faction.Hostile);
    };

    if (!mapLoaded || !zoneData.creatures[Faction.Hostile]) return null;

    return (
        <>
            {zoneData.creatures[Faction.Hostile].map(e => (
                <Npc key={e.id} skin={e.sprite} startPosition={e.pos} data={{ id: e.id, faction: e.faction }} useTurn={useTurn} />
            ))}
        </>
    );


};

export default HostileManager;