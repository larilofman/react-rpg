import React, { useEffect, useState } from 'react';
import { useStateValue } from '../state';
import CreatureManager from '../npc/creature-manager';
import Map from '../map';
import Player from '../player';
import { Creature, Faction, ZoneData, ZoneType } from '../../types';
import useAddCreatures from '../state/action-hooks/useAddCreatures';
import useUseTurn from '../state/action-hooks/useUseTurn';
import useSetMap from '../state/action-hooks/useSetMap';
import { loadZoneData, ZoneName } from '../../utils/load-zone-data';

const GameManager: React.FC = () => {
    const [{ mapLoaded, gameOver, playerPosition, visitedZones, zoneData }] = useStateValue();
    const { addCreatures } = useAddCreatures();
    const { useTurn } = useUseTurn();
    const { setMap } = useSetMap();
    const [loadedZone, setLoadedZone] = useState<ZoneType | undefined>();

    const playerData: Creature = {
        id: 'player',
        faction: Faction.Player,
        pos: playerPosition,
        stats: { health: 100, maxHealth: 100, damage: 5 },
        name: 'Player',
        sprite: 'f1'
    };
    useEffect(() => {

        if (!mapLoaded) {
            const visitedZone = visitedZones.find(z => z.name === zoneData.name);
            if (visitedZone) {
                setMap(visitedZone);
                // tarvii hakea playerin entry position jotenkin
                return;
            } else {
                const zoneToLoad: ZoneType = loadZoneData(zoneData.name as ZoneName);
                setLoadedZone(zoneToLoad);
            }
        }

        if (mapLoaded && freshZone()) {
            addCreatures([playerData], playerData.faction);
        }

    }, [mapLoaded]);

    const freshZone = () => {
        return !visitedZones.map(z => z.name).includes(zoneData.name);
    };

    useEffect(() => {
        console.log('zone changed: ', zoneData.name);
    }, [zoneData.name]);

    return (
        <>
            <Map loadedZone={loadedZone} setLoadedZone={setLoadedZone} />
            {!gameOver && mapLoaded && <Player skin={playerData.sprite} data={{ id: playerData.id, faction: playerData.faction }} useTurn={useTurn} />}
            <CreatureManager useTurn={useTurn} freshZone={freshZone} />
        </>
    );
};

export default GameManager;