import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { loadZoneData } from '../../../utils/load-data';
import { useDispatch, useSelector } from 'react-redux';
import { SetCreatures } from '../../redux-state/reducers/zone/actions';
import { RootState } from '../../redux-state/store';
import useGetTiles from '../../../hooks/use-get-tiles';
import { Faction, CreatureType, Creature } from '../../../types/creature';
import { Position } from '../../../types/general';
import { ZoneName } from '../../../data/zones';

interface Props {
    zoneName: ZoneName
    creaturesLoaded: boolean
}

const CreatureSpawner: React.FC<Props> = ({ zoneName, creaturesLoaded }) => {
    const dispatch = useDispatch();
    const visitedZones = useSelector((state: RootState) => state.game.visitedZones);
    const player = useSelector((state: RootState) => state.game.player);
    const { findFreeRandomFloorTile } = useGetTiles();

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
                const loadedCreatures = loadZoneData(zoneName).creatures;
                const spawnedCreatures = spawnCreatures(loadedCreatures, player.pos);
                dispatch(SetCreatures({ ...spawnedPlayer, ...spawnedCreatures }));
            }
        }

    }, [creaturesLoaded]);

    const spawnCreatures = (creaturesToSpawn: { creature: CreatureType, amount: number, faction: Faction }[], playerPos: Position) => {
        const occupiedPositions: Position[] = [playerPos];
        const allEnemies: Creature[] = [];
        const allFriendlies: Creature[] = [];
        creaturesToSpawn.forEach(({ creature, amount, faction }) => {
            for (let i = 0; i < amount; i++) {
                const creatureToAdd: Creature = {
                    faction,
                    pos: findFreeRandomFloorTile(occupiedPositions).position,
                    id: nanoid(),
                    stats: creature.stats,
                    name: creature.name,
                    sprite: creature.sprite
                };
                occupiedPositions.push(creatureToAdd.pos);
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