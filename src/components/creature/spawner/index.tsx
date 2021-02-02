import React, { useEffect } from 'react';
import useFindRandomFloorTile from '../../../hooks/use-find-random-floor-tile';
import { Creature, Faction, CreatureType } from '../../../types';
import { nanoid } from 'nanoid';
import creatures from '../../../data/creature/creatureData.json';
import { loadZoneData, ZoneName, loadPlayerData } from '../../../utils/load-data';

import { useDispatch, useSelector } from 'react-redux';
import { AddCreatures, SetCreaturesLoaded } from '../../redux-state/reducers/zone/actions';
import { RootState } from '../../redux-state/store';

type CreatureName = keyof typeof creatures;

interface Props {
    zoneName: ZoneName
    player: Creature
    creaturesLoaded: boolean
}

const CreatureSpawner: React.FC<Props> = ({ zoneName, creaturesLoaded, player }) => {
    const dispatch = useDispatch();
    // const visitedZones = useSelector((state: RootState) => state.zone.visitedZones);
    const { findRandomFloorTile } = useFindRandomFloorTile();

    useEffect(() => {
        if (!creaturesLoaded) {
            spawnPlayer();
            const creaturesToSpawn = getCreaturesToSpawn();
            spawnCreatures(creaturesToSpawn);
            dispatch(SetCreaturesLoaded(true));
        }
    }, [creaturesLoaded]);

    // useEffect(() => {
    //     if (visitedZones.map(z => z.name).includes(zoneName)) {
    //         dispatch(SetInteractableTiles(zoneInteractableTiles));
    //         dispatch(SetObjectsLoaded(true));
    //     } else {
    //         loadRoutes();
    //         dispatch(SetCreaturesLoaded(true));
    //     }
    // }, [creaturesLoaded]);

    const spawnPlayer = () => {
        // the very start of the game when there is no player, later it will get passed on by useLoadZone hook
        if (!player) {
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
    if (prevProps.creaturesLoaded !== nextProps.creaturesLoaded) return false;
    return true;
};


export default React.memo(CreatureSpawner, areEqual);