import React, { useEffect, useState } from 'react';
import GameObject from '../game-object';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useWander from '../../hooks/use-wander';
import { useStateValue } from '../state';
import { Position, Creature } from '../../types';
import useUseTurn from '../state/action-hooks/useUseTurn';
import useCheckCollision from '../../hooks/use-check-collision';
import useMoveCreature from '../state/action-hooks/useMoveCreature';
import useContact from '../../hooks/use-contact';
import calculateDistance from '../../utils/calculate-distance';

interface Props {
    skin: string,
    startPosition?: Position
    data: Creature
}

const Npc: React.FC<Props> = ({ skin, startPosition, data }) => {
    const [{ mapLoaded, playerPosition }] = useStateValue();
    const { useTurn, canAct } = useUseTurn(data.faction);
    const { getRandomDirection, getRandomNearbyPos } = useWander();
    const { checkCollision, isWalkable } = useCheckCollision();
    const { walk, position } = useWalk(startPosition);
    const { dir, step, setAnimState } = useAnimation(3);
    const { moveCreature } = useMoveCreature();
    const [creature, setCreature] = useState(data);
    const { contact } = useContact();

    useEffect(() => {
        if (mapLoaded) {
            moveCreature(data);
        }
    }, [mapLoaded]);

    useEffect(() => {
        if (canAct) {
            wander();
        }
    }, [canAct]);

    const wander = () => {
        const newPos = getRandomNearbyPos(position);
        // const newTile = checkCollision(position, dir);

        if (isWalkable(newPos)) {
            const newCreature: Creature = {
                ...creature,
                pos: newPos
            };
            moveCreature(newCreature);
            setCreature(newCreature);
            walk(newPos);
        }



        // const wander = () => {
        //     const dir = getRandomDirection();
        //     const newTile = checkCollision(position, dir);

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

        useTurn();
        setAnimState(dir);
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
