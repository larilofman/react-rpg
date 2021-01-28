import React, { useEffect, useState } from 'react';
import CreatureManager from '../npc/creature-manager';
import Map from '../map';
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
    const { playerPosition, mapLoaded, gameOver, visitedZones, zoneData } = useSelector((state: RootState) => (
        {
            playerPosition: state.playerPosition,
            mapLoaded: state.zone.mapLoaded,
            gameOver: state.zone.gameOver,
            visitedZones: state.zone.visitedZones,
            zoneData: state.zone.zoneData
        }
    ));

    const playerData: Creature = {
        id: 'player',
        faction: Faction.Player,
        pos: playerPosition,
        stats: { health: 1000, maxHealth: 1000, damage: 5 },
        name: 'Player',
        sprite: 'f1'
    };
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

        if (mapLoaded && !zoneData.creatures[0].length) {
            dispatch(AddCreatures([playerData], playerData.faction));
        }

    }, [mapLoaded]);

    const freshZone = () => {
        return !visitedZones.map(z => z.name).includes(zoneData.name);
    };

    return (
        <>
            <Map loadedZone={loadedZone} setLoadedZone={setLoadedZone} />
            {!gameOver && mapLoaded && <Player skin={playerData.sprite} data={{ id: playerData.id, faction: playerData.faction }} useTurn={useTurn} />}
            <CreatureManager useTurn={useTurn} freshZone={freshZone} />
            <ObjectManager freshZone={freshZone} />
        </>
    );
};

export default GameManager;