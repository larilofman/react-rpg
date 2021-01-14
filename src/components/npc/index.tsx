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

interface Props {
    skin: string,
    startPosition?: Position
    data: Creature
}

const Npc: React.FC<Props> = ({ skin, startPosition, data }) => {
    const [{ mapLoaded }] = useStateValue();
    const { useTurn, canAct } = useUseTurn(data.faction);
    const { getRandomDirection } = useWander();
    const { checkCollision } = useCheckCollision();
    const { walk, position } = useWalk(startPosition);
    const { dir, step, setAnimState } = useAnimation(3);
    const { moveCreature } = useMoveCreature();
    const [creature, setCreature] = useState(data);

    useEffect(() => {
        if (mapLoaded) {
            moveCreature(data, position);
        }
    }, [mapLoaded]);

    useEffect(() => {
        if (canAct) {
            wander();
        }
    }, [canAct]);

    const wander = () => {
        const dir = getRandomDirection();
        const newPos = checkCollision(position, dir);

        if (newPos) {
            if (newPos.occupant) {
                // meleeAttack(newPos.occupant);
            } else {
                if (newPos.passable) {
                    const newCreature: Creature = {
                        ...creature,
                        pos: newPos.position
                    };
                    moveCreature(newCreature, position);
                    setCreature(newCreature);
                    walk(newPos);
                }
            }

        }

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
