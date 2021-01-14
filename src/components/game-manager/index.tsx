import React from 'react';
import { useStateValue } from '../state';
import EnemyManager from '../npc/enemy/enemy-manager';
import Player from '../player';
import { Creature, Faction } from '../../types';

const GameManager: React.FC = () => {
    const [{ zoneData, playerPosition }] = useStateValue();

    const playerData: Creature = {
        id: 'player',
        faction: Faction.Player,
        pos: { x: 0, y: 0 },
        stats: { health: 100 }
    };

    return (
        <>
            <Player skin="f1" startPos={playerPosition} data={playerData} />
            <EnemyManager />
        </>
    );
};

export default GameManager;