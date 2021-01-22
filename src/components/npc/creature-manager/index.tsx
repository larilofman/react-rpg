import React, { useEffect } from 'react';
import { useStateValue } from '../../state';
import useFindRandomFloorTile from '../../../hooks/use-find-random-floor-tile';
import Npc from '..';
import { Creature, Faction, BaseCreature, CreatureType } from '../../../types';
import useAddCreatures from '../../state/action-hooks/useAddCreatures';
import { nanoid } from 'nanoid';
import creatures from '../../../data/creature/creatures.json';
import { loadZoneData, ZoneType } from '../../../utils/load-zone-data';

type CreatureData = keyof typeof creatures;

interface Props {
    useTurn: (creature: BaseCreature) => void
}

const CreatureManager: React.FC<Props> = ({ useTurn }) => {
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
        const enemiesToSpawn: { creature: CreatureType, amount: number, faction: Faction }[] = [];
        Object.values(enemyData).forEach(e => {
            enemiesToSpawn.push({ creature: creatures[e.name as CreatureData] as CreatureType, amount: e.amount, faction: e.faction as unknown as Faction });
        });

        return enemiesToSpawn;
    };

    const spawnEnemies = (enemiesToSpawn: { creature: CreatureType, amount: number, faction: Faction }[]) => {
        const allEnemies: Creature[] = [];
        const allFriendlies: Creature[] = [];
        enemiesToSpawn.forEach(({ creature, amount, faction }) => {
            for (let i = 0; i < amount; i++) {
                const creatureToAdd: Creature = {
                    faction: Faction[faction] as unknown as Faction,
                    pos: findRandomFloorTile().position,
                    id: nanoid(),
                    stats: creature.stats,
                    name: creature.name,
                    sprite: creature.sprite
                };
                creatureToAdd.faction === Faction.Hostile ? allEnemies.push(creatureToAdd) : allFriendlies.push(creatureToAdd);
                // addCreatures([creatureToAdd], creatureToAdd.faction);
            }
        });
        addCreatures(allEnemies, Faction.Hostile);
        addCreatures(allFriendlies, Faction.Friendly);
    };

    if (!mapLoaded || (!zoneData.creatures[Faction.Hostile] && !zoneData.creatures[Faction.Friendly])) return null;

    return (
        <>
            {zoneData.creatures[Faction.Hostile].map(e => (
                <Npc key={e.id} skin={e.sprite} startPosition={e.pos} data={{ id: e.id, faction: e.faction }} useTurn={useTurn} />
            ))}
            {zoneData.creatures[Faction.Friendly].map(e => (
                <Npc key={e.id} skin={e.sprite} startPosition={e.pos} data={{ id: e.id, faction: e.faction }} useTurn={useTurn} hostile={false} />
            ))}
        </>
    );


};

export default CreatureManager;