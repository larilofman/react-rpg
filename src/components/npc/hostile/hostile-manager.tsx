import React, { useEffect } from 'react';
import { useStateValue } from '../../state';
import useFindRandomFloorTile from '../../../hooks/use-find-random-floor-tile';
import Npc from '..';
import { Creature, Faction } from '../../../types';
import useAddCreatures from '../../state/action-hooks/useAddCreatures';
import { nanoid } from 'nanoid';

interface Props {
    useTurn: (faction: Faction) => void
}

const EnemyManager: React.FC<Props> = ({ useTurn }) => {
    const [{ zoneData, mapLoaded, turn }] = useStateValue();
    const { findRandomFloorTile } = useFindRandomFloorTile();
    const { addCreatures } = useAddCreatures();

    useEffect(() => {
        if (mapLoaded) {
            spawnEnemies();
        }

    }, [mapLoaded]);

    useEffect(() => {
        // for (const faction of Object.values(zoneData.creatures)) {
        //     console.log(faction);
        // }

        // const occupied = [];
        // for (let y = 0; y < zoneData.tiles.length; y++) {
        //     for (let x = 0; x < zoneData.tiles.length; x++) {
        //         if (zoneData.tiles[y][x].occupant) {
        //             occupied.push({ creature: zoneData.tiles[y][x].occupant, pos: `${x}, ${y}` });
        //         }
        //     }
        // }
        // console.log(turnOf, occupied);
        // console.log(zoneData.creatures);
        // console.log(turnOf);
        const player = zoneData.creatures[Faction.Player][0];
        const enemy = zoneData.creatures[Faction.Hostile][0];
        if (player && enemy) {
            if (player.pos.x === enemy.pos.x && player.pos.y === enemy.pos.y) {
                console.log('they collided!');
            }
        }
    }, [zoneData]);

    const spawnEnemies = () => {
        const enemies = [];
        for (let index = 0; index < 5; index++) {
            const enemy: Creature = {
                faction: Faction.Hostile,
                pos: findRandomFloorTile().position,
                id: nanoid(),
                stats: { health: 10, damage: 5 }
            };
            enemies.push(enemy);
        }
        addCreatures(enemies, Faction.Hostile);
    };

    if (!mapLoaded || !zoneData.creatures[Faction.Hostile]) return null;

    return (
        <>
            {zoneData.creatures[Faction.Hostile].map(e => (
                <Npc key={e.id} skin="e1" startPosition={e.pos} data={{ id: e.id, faction: e.faction }} useTurn={useTurn} />
            ))}
        </>
    );


};

export default EnemyManager;