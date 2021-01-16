import React, { useEffect } from 'react';
import { useStateValue } from '../state';
import HostileManager from '../npc/hostile/hostile-manager';
import FriendlyManager from '../npc/friendly/friendly-manager';
import Player from '../player';
import { Creature, Faction } from '../../types';
import useAddCreatures from '../state/action-hooks/useAddCreatures';
import { isPropertyAccessOrQualifiedName } from 'typescript';

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
        if (mapLoaded) {
            addCreatures([playerData], playerData.faction);
        }
    }, [mapLoaded]);

    return (
        <>
            <Player skin="f1" startPos={playerPosition} data={{ id: playerData.id, faction: playerData.faction }} />
            <HostileManager />
            <FriendlyManager />
        </>
    );
};

export default GameManager;