import React, { useEffect } from 'react';
import useFindRandomFloorTile from '../../../hooks/use-find-random-floor-tile';
import Npc from '..';
import { Creature, Faction, BaseCreature, CreatureType, Position } from '../../../types';
import { nanoid } from 'nanoid';
import creatures from '../../../data/creature/creatureData.json';
import { loadZoneData, ZoneName, loadPlayerData } from '../../../utils/load-data';
import settings from '../../../data/settings.json';
import Player from '../../player';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux-state/store';
import { AddCreatures } from '../../redux-state/reducers/zone/actions';

type CreatureName = keyof typeof creatures;

interface Props {
    useTurn: (creature: BaseCreature) => void
    freshZone: () => boolean
}

const CreatureManager: React.FC<Props> = ({ useTurn, freshZone }) => {
    const { player, cameraPosition, zoneStatus, mapLoaded, gameOver } = useSelector((state: RootState) => (
        {
            cameraPosition: state.cameraPosition,
            zoneStatus: state.zone.zoneStatus,
            mapLoaded: state.zone.mapLoaded,
            player: state.zone.zoneStatus.creatures[Faction.Player][0],
            gameOver: state.zone.gameOver
        }
    ));
    const dispatch = useDispatch();
    const { findRandomFloorTile } = useFindRandomFloorTile();

    useEffect(() => {
        if (mapLoaded && freshZone()) {
            const creaturesToSpawn = getCreaturesToSpawn();
            spawnCreatures(creaturesToSpawn);
            spawnPlayer();
        }
    }, [mapLoaded]);

    const spawnPlayer = () => {
        // the very start of the game when there is no player, later it will get passed on by useLoadZone hook
        if (mapLoaded && !zoneStatus.creatures[0].length) {
            const playerData = loadPlayerData();
            dispatch(AddCreatures([playerData], playerData.faction));
        }
    };

    const getCreaturesToSpawn = () => {
        const creatureData = loadZoneData(zoneStatus.name as ZoneName).creatures; // load list of enemies from data
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
                // addCreatures([creatureToAdd], creatureToAdd.faction);
            }
        });
        dispatch(AddCreatures(allEnemies, Faction.Hostile));
        dispatch(AddCreatures(allFriendlies, Faction.Friendly));
    };

    const isVisible = (pos: Position) => {
        if (pos.x >= cameraPosition.x &&
            pos.x < cameraPosition.x + settings.displaySize.w &&
            pos.y >= cameraPosition.y &&
            pos.y < cameraPosition.y + settings.displaySize.h) {
            return true;
        }
        return false;
    };

    if (!mapLoaded) return null;

    return (
        <>
            {
                player && !gameOver &&
                <Player skin={player.sprite} data={{ id: player.id, faction: player.faction }} useTurn={useTurn} />
            }
            {zoneStatus.creatures[Faction.Hostile].map(e => (
                <Npc
                    key={e.id}
                    skin={e.sprite}
                    startPosition={e.pos}
                    data={{ id: e.id, faction: e.faction }}
                    useTurn={useTurn}
                    isVisible={isVisible(e.pos)} />
            ))}
            {zoneStatus.creatures[Faction.Friendly].map(e => (
                <Npc
                    key={e.id}
                    skin={e.sprite}
                    startPosition={e.pos}
                    data={{ id: e.id, faction: e.faction }}
                    useTurn={useTurn}
                    isVisible={isVisible(e.pos)}
                    hostile={false} />
            ))}
        </>
    );


};

export default CreatureManager;