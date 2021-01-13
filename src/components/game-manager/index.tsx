import React from 'react';
import { useStateValue } from '../state';
import EnemyManager from '../npc/enemy/enemy-manager';
import Player from '../player';
import { Creature, Faction } from '../../types';



const GameManager: React.FC = () => {
    const [{ zoneData }] = useStateValue();

    const playerData: Creature = {
        id: 'player',
        faction: Faction.Player,
        pos: { x: 0, y: 0 }
    };

    return (
        <>
            <Player skin="f1" startPos={{ x: 0, y: 0 }} data={playerData} />
            <EnemyManager />
        </>
    );
};

export default GameManager;