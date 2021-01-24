import React, { useEffect } from 'react';
import { useStateValue } from '../state';
import CreatureManager from '../npc/creature-manager';
import Map from '../map';
import Player from '../player';
import { Creature, Faction } from '../../types';
import useAddCreatures from '../state/action-hooks/useAddCreatures';
import useUseTurn from '../state/action-hooks/useUseTurn';

const GameManager: React.FC = () => {
    const [{ mapLoaded, gameOver, playerPosition, visitedZones, zoneData }] = useStateValue();
    const { addCreatures } = useAddCreatures();
    const { useTurn } = useUseTurn();

    const playerData: Creature = {
        id: 'player',
        faction: Faction.Player,
        pos: playerPosition,
        stats: { health: 100, maxHealth: 100, damage: 5 },
        name: 'Player',
        sprite: 'f1'
    };
    useEffect(() => {
        if (mapLoaded && !visitedZones.map(z => z.name).includes(zoneData.name)) {
            addCreatures([playerData], playerData.faction);
        }
    }, [mapLoaded]);

    return (
        <>
            <Map />
            {!gameOver && mapLoaded && <Player skin={playerData.sprite} data={{ id: playerData.id, faction: playerData.faction }} useTurn={useTurn} />}
            <CreatureManager useTurn={useTurn} />
        </>
    );
};

export default GameManager;