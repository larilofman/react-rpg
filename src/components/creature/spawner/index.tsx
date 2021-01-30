import React, { useEffect } from 'react';
import useFindRandomFloorTile from '../../../hooks/use-find-random-floor-tile';
import { Creature, Faction, CreatureType } from '../../../types';
import { nanoid } from 'nanoid';
import creatures from '../../../data/creature/creatureData.json';
import { loadZoneData, ZoneName, loadPlayerData } from '../../../utils/load-data';

import { useDispatch } from 'react-redux';
import { AddCreatures } from '../../redux-state/reducers/zone/actions';

type CreatureName = keyof typeof creatures;

interface Props {
    freshZone: () => boolean
    zoneName: ZoneName
    player: Creature
    mapLoaded: boolean
}

const CreatureSpawner: React.FC<Props> = ({ freshZone, zoneName, mapLoaded, player }) => {
    const dispatch = useDispatch();
    const { findRandomFloorTile } = useFindRandomFloorTile();

    useEffect(() => {
        if (mapLoaded && freshZone()) {
            spawnPlayer();
            const creaturesToSpawn = getCreaturesToSpawn();
            spawnCreatures(creaturesToSpawn);
        }
    }, [mapLoaded]);

    const spawnPlayer = () => {
        // the very start of the game when there is no player, later it will get passed on by useLoadZone hook
        if (mapLoaded && !player) {
            const playerData = loadPlayerData();
            dispatch(AddCreatures([playerData], playerData.faction));
        }
    };

    const getCreaturesToSpawn = () => {
        const creatureData = loadZoneData(zoneName).creatures; // load list of enemies from data
        const creaturesToSpawn: { creature: CreatureType, amount: number, faction: Faction }[] = [];
        Object.values(creatureData).forEach(c => { // find the creature's data by its name
            creaturesToSpawn.push({ creature: creatures[c.name as CreatureName] as CreatureType, amount: c.amount, faction: c.faction as unknown as Faction });
        });

        return creaturesToSpawn;
    };

    const spawnCreatures = (creaturesToSpawn: { creature: CreatureType, amount: number, faction: Faction }[]) => {
        const allEnemies: Creature[] = [];
        const allFriendlies: Creature[] = [];
        creaturesToSpawn.forEach(({ creature, amount, faction }) => {
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
            }
        });
        dispatch(AddCreatures(allEnemies, Faction.Hostile));
        dispatch(AddCreatures(allFriendlies, Faction.Friendly));
    };

    return null;
};

const areEqual = (prevProps: Readonly<React.PropsWithChildren<Props>>, nextProps: Readonly<React.PropsWithChildren<Props>>) => {
    if (prevProps.zoneName !== nextProps.zoneName) return false;

    return true;
};


export default React.memo(CreatureSpawner, areEqual);