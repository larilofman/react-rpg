import React, { useEffect, useState } from 'react';
import CreatureManager from '../npc/creature-manager';
import Map from '../map/manager';
import Player from '../player';
import { Creature, Faction, ZoneType } from '../../types';
import useUseTurn from '../../hooks/use-use-turn';
import { loadZoneData, ZoneName } from '../../utils/load-zone-data';
import ObjectManager from '../object-manager';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux-state/store/index';
import { AddCreatures, SetMap } from '../redux-state/reducers/zone/actions';

const GameManager: React.FC = () => {
    const { useTurn } = useUseTurn();
    const [loadedZone, setLoadedZone] = useState<ZoneType | undefined>();
    const dispatch = useDispatch();
    const { player, mapLoaded, gameOver, visitedZones, zoneData } = useSelector((state: RootState) => (
        {
            player: state.zone.zoneData.creatures[Faction.Player][0],
            mapLoaded: state.zone.mapLoaded,
            gameOver: state.zone.gameOver,
            visitedZones: state.zone.visitedZones,
            zoneData: state.zone.zoneData
        }
    ));

    useEffect(() => {

        if (!mapLoaded) {
            if (zoneData.tiles.length) { // A visited zone is loaded
                dispatch(SetMap(zoneData));
                return;
            } else { // A fresh zone is loaded
                const zoneToLoad: ZoneType = loadZoneData(zoneData.name as ZoneName);
                setLoadedZone(zoneToLoad);
            }
        }

        // the very start of the game when there is no player, later it will get passed on by useLoadZone hook
        if (mapLoaded && !zoneData.creatures[0].length) {
            const playerData: Creature = {
                id: 'player',
                faction: Faction.Player,
                pos: { x: 0, y: 0 },
                stats: { health: 1000, maxHealth: 1000, damage: 5 },
                name: 'Player',
                sprite: 'f1'
            };
            dispatch(AddCreatures([playerData], playerData.faction));
        }

    }, [mapLoaded]);

    const freshZone = () => {
        return !visitedZones.map(z => z.name).includes(zoneData.name);
    };

    return (
        <>
            <Map loadedZone={loadedZone} setLoadedZone={setLoadedZone} />
            {
                mapLoaded && player && !gameOver &&
                <Player skin={player.sprite} data={{ id: player.id, faction: player.faction }} useTurn={useTurn} />
            }
            <CreatureManager useTurn={useTurn} freshZone={freshZone} />
            <ObjectManager freshZone={freshZone} />
        </>
    );
};

export default GameManager;