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
    const [currentZone, setCurrentZone] = useState<ZoneType | undefined>();

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
                setCurrentZone(zoneToLoad);
            }
        }

        // mappi ei ole ladattu
        // jos mappi löytyy visited zoneista, setMap(visitedZone) ja return
        // muutoin annetaan mapille propsiksi const zoneToLoad: ZoneType = loadZoneData(zoneData.name as ZoneName);

        // if (mapLoaded) {
        //     if (!zonevisited) {
        //         // call creatureManager to spawn enemies
        //         addCreatures([playerData], playerData.faction);
        //     }
        // } else {
        //     const visitedZone = visitedZones.find(z => z.name === zoneData.name);
        //     if (visitedZone) {
        //         setMap(visitedZone);
        //         return;
        //     } else {
        //         // call map to build/generate tiles and call setMap callback
        //     }
        // }
        // // if (!mapLoaded) {
        // //     if (!visitedZones.map(z => z.name).includes(zoneData.name)) {
        // //         // generate map
        // //         //
        // //     }
        // // }
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

    // const zoneVisited = () => {
    //     return visitedZones.find(z => z.name === zoneData.name);
    // };

    return (
        <>
            <Map currentZone={currentZone} setCurrentZone={setCurrentZone} />
            {!gameOver && mapLoaded && <Player skin={playerData.sprite} data={{ id: playerData.id, faction: playerData.faction }} useTurn={useTurn} />}
            <CreatureManager useTurn={useTurn} freshZone={freshZone} />
        </>
    );
};

export default GameManager;