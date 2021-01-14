import React, { useEffect } from 'react';
import { useStateValue } from '../state';
import EnemyManager from '../npc/enemy/enemy-manager';
import Player from '../player';
import { Creature, Faction } from '../../types';
import useAddCreatures from '../state/action-hooks/useAddCreatures';

const GameManager: React.FC = () => {
    const [{ playerPosition, mapLoaded }] = useStateValue();
    const { addCreatures } = useAddCreatures();

    const playerData: Creature = {
        id: 'player',
        faction: Faction.Player,
        pos: { x: 0, y: 0 },
        stats: { health: 100, damage: 5 }
    };
    useEffect(() => {
        addCreatures([playerData], playerData.faction);
    }, [mapLoaded]);

    return (
        <>
            <Player skin="f1" startPos={playerPosition} data={playerData} />
            <EnemyManager />
        </>
    );
};

export default GameManager;