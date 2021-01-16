import React, { useEffect, useState } from 'react';
import GameObject from '../game-object';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useWander from '../../hooks/use-wander';
import { useStateValue } from '../state';
import { Position, BaseCreature, TileStatus, Faction } from '../../types';
import useUseTurn from '../state/action-hooks/useUseTurn';
import useGetTileInDirection from '../../hooks/use-get-tile';
import useMoveCreature from '../state/action-hooks/useMoveCreature';
import useContact from '../../hooks/use-contact';
import calculateDistance from '../../utils/calculate-distance';

interface Props {
    skin: string,
    startPosition: Position
    data: BaseCreature
    useTurn: (faction: Faction) => void
}

const Npc: React.FC<Props> = ({ skin, startPosition, data, useTurn }) => {
    const [{ mapLoaded, playerPosition, turn }] = useStateValue();
    const { getRandomDirection, getRandomNearbyPos } = useWander();
    const { getTileInDirection, getTileStatus } = useGetTileInDirection();
    const { walk, position } = useWalk(startPosition);
    const { dir, step, setAnimState } = useAnimation(3);
    const { moveCreature } = useMoveCreature();
    const { contact } = useContact();

    useEffect(() => {
        if (mapLoaded) {
            moveCreature(data, startPosition);
        }
    }, [mapLoaded]);

    useEffect(() => {
        if (turn.faction === data.faction) {
            wander();
        }
    }, [turn]);

    const wander = () => {
        const newPos = getRandomNearbyPos(position);

        const tileStatus = getTileStatus(newPos);
        if (tileStatus === TileStatus.Passable) {
            walk(data, newPos);
        }



        // const wander = () => {
        //     const dir = getRandomDirection();
        //     const newTile = getTileInDirection(position, dir);

        //     if (newTile) {
        //         if (newTile.occupant) {
        //             // meleeAttack(newTile.occupant);
        //         } else {
        //             if (newTile.passable) {
        //                 const newCreature: Creature = {
        //                     ...creature,
        //                     pos: newTile.position
        //                 };
        //                 moveCreature(newCreature, newTile.position, position);
        //                 setCreature(newCreature);
        //                 walk(newTile.position);
        //             }
        //         }
        //     }

        // const d = calculateDistance(playerPosition, position);
        // if (d <= 1) {
        //     contact(data, 'player');
        // } else if (newTile) {
        //     if (newTile.occupant) {
        //         // meleeAttack(newTile.occupant);
        //     } else {
        //         if (newTile.passable) {
        //             const newCreature: Creature = {
        //                 ...creature,
        //                 pos: newTile.position
        //             };
        //             moveCreature(newCreature, newTile.position, position);
        //             setCreature(newCreature);
        //             walk(newTile.position);
        //         }
        //     }

        // }

        useTurn(data.faction);
        setAnimState(position, newPos);
    };

    return <GameObject
        spriteData={{
            offset_x: step,
            offset_y: dir,
            image: `/sprites/skins/${skin}.png`,
            layer: 1
        }}
        position={position}
    />;

};

export default Npc;
