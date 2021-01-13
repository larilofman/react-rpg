import React, { useEffect, useState } from 'react';
import GameObject from '../game-object';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useWander from '../../hooks/use-wander';
import { useStateValue } from '../state';
import { Position, Creature } from '../../types';
import useUseEnemyTurn from '../state/action-hooks/useUseEnemyTurn';
import useCheckCollision from '../../hooks/use-check-collision';
import useOccupyTile from '../state/action-hooks/useOccupyTile';

interface Props {
    skin: string,
    startPosition?: Position
    data: Creature
}

const Npc: React.FC<Props> = ({ skin, startPosition, data }) => {
    const [{ mapLoaded, playerTurn }] = useStateValue();
    const { useEnemyTurn } = useUseEnemyTurn();
    const { getRandomDirection } = useWander();
    const { checkCollision } = useCheckCollision();
    const { walk, position } = useWalk(startPosition);
    const { dir, step, setAnimState } = useAnimation(3);
    const { occupyTile } = useOccupyTile();
    const [creature, setCreature] = useState(data);

    useEffect(() => {
        if (mapLoaded) {
            if (!playerTurn) {
                wander();
            }
        }
    }, [playerTurn, mapLoaded]);

    const wander = () => {
        const dir = getRandomDirection();
        const newPos = checkCollision(position, dir);

        if (newPos?.passable) {
            const newCreature: Creature = {
                ...creature,
                pos: newPos.position
            };
            occupyTile(newCreature, position);
            setCreature(newCreature);
            walk(newPos);
        }

        useEnemyTurn();
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
