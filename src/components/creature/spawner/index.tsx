import React, { useEffect } from 'react';
import useFindRandomFloorTile from '../../../hooks/use-find-random-floor-tile';
import { Creature, Faction, CreatureType } from '../../../types';
import { nanoid } from 'nanoid';
import creatures from '../../../data/creature/creatureData.json';
import { loadZoneData, ZoneName } from '../../../utils/load-data';

import { useDispatch, useSelector } from 'react-redux';
import { SetCreatures } from '../../redux-state/reducers/zone/actions';
import { RootState } from '../../redux-state/store';

type CreatureName = keyof typeof creatures;

interface Props {
    zoneName: ZoneName
    creaturesLoaded: boolean
}

const CreatureSpawner: React.FC<Props> = ({ zoneName, creaturesLoaded }) => {
    const dispatch = useDispatch();
    const visitedZones = useSelector((state: RootState) => state.game.visitedZones);
    const player = useSelector((state: RootState) => state.game.player);
    const { findRandomFloorTile } = useFindRandomFloorTile();

    useEffect(() => {
        if (!creaturesLoaded) {
            const visitedZone = visitedZones.find(z => z.name === zoneName);
            if (visitedZone) {
                dispatch(SetCreatures({
                    [Faction.Player]: [player],
                    [Faction.Friendly]: visitedZone.creatures[Faction.Friendly],
                    [Faction.Hostile]: visitedZone.creatures[Faction.Hostile]
                }));
            } else {
                const spawnedPlayer = {
                    [Faction.Player]: [player]
                };
                const loadedCreatures = loadCreatures();
                const spawnedCreatures = spawnCreatures(loadedCreatures);
                dispatch(SetCreatures({ ...spawnedPlayer, ...spawnedCreatures }));
            }
        }

    }, [creaturesLoaded]);

    const loadCreatures = () => {
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
        return { [Faction.Friendly]: allFriendlies, [Faction.Hostile]: allEnemies };
    };

    return null;
};

const areEqual = (prevProps: Readonly<React.PropsWithChildren<Props>>, nextProps: Readonly<React.PropsWithChildren<Props>>) => {
    if (!nextProps.creaturesLoaded) return false;
    return true;
};


export default React.memo(CreatureSpawner, areEqual);