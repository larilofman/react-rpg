import React, { useEffect } from 'react';
import { useStateValue } from '../state';
import HostileManager from '../npc/hostile/hostile-manager';
import FriendlyManager from '../npc/friendly/friendly-manager';
import Player from '../player';
import { Creature, Faction } from '../../types';
import useAddCreatures from '../state/action-hooks/useAddCreatures';
import useUseTurn from '../state/action-hooks/useUseTurn';

const GameManager: React.FC = () => {
    const [{ playerPosition, mapLoaded, gameOver }] = useStateValue();
    const { addCreatures } = useAddCreatures();
    const { useTurn } = useUseTurn();

    const playerData: Creature = {
        id: 'player',
        faction: Faction.Player,
        pos: { x: 0, y: 0 },
        stats: { health: 1000, damage: 5 }
    };
    useEffect(() => {
        if (mapLoaded) {
            addCreatures([playerData], playerData.faction);
        }
    }, [mapLoaded]);

    return (
        <>
            {!gameOver && <Player skin="f1" data={{ id: playerData.id, faction: playerData.faction }} useTurn={useTurn} />}
            <HostileManager useTurn={useTurn} />
            <FriendlyManager useTurn={useTurn} />
        </>
    );
};

export default GameManager;