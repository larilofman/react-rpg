import React, { useEffect } from 'react';
import useFindRandomFloorTile from '../../../hooks/use-find-random-floor-tile';
import { Creature, Faction, CreatureType } from '../../../types';
import { nanoid } from 'nanoid';
import creatures from '../../../data/creature/creatureData.json';
import { loadZoneData, ZoneName, loadPlayerData } from '../../../utils/load-data';

import { useDispatch, useSelector } from 'react-redux';
import { AddCreatures, SetCreatures, SetCreaturesLoaded } from '../../redux-state/reducers/zone/actions';
import { RootState } from '../../redux-state/store';

type CreatureName = keyof typeof creatures;

interface Props {
    zoneName: ZoneName
    player: Creature
    creaturesLoaded: boolean
}

const CreatureSpawner: React.FC<Props> = ({ zoneName, creaturesLoaded }) => {
    const dispatch = useDispatch();
    const visitedZones = useSelector((state: RootState) => state.zone.visitedZones);
    const player = useSelector((state: RootState) => state.game.player);
    const { findRandomFloorTile } = useFindRandomFloorTile();

    useEffect(() => {
        const visitedZone = visitedZones.find(z => z.name === zoneName);
        if (visitedZone) {
            dispatch(SetCreatures({
                [Faction.Player]: [player],
                [Faction.Friendly]: visitedZone.creatures[Faction.Friendly],
                [Faction.Hostile]: visitedZone.creatures[Faction.Hostile]
            }));
        } else {
            dispatch(AddCreatures([player], Faction.Player));
            const creaturesToSpawn = getCreaturesToSpawn();
            spawnCreatures(creaturesToSpawn);
            dispatch(SetCreaturesLoaded(true));
        }
    }, [creaturesLoaded]);

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
    if (!nextProps.creaturesLoaded) return false;
    return true;
};


export default React.memo(CreatureSpawner, areEqual);