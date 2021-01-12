import React, { useEffect } from 'react';
import GameObject from '../game-object';
import useWalk from '../../hooks/use-walk';
import useAnimation from '../../hooks/use-animation';
import useWander from '../../hooks/use-wander';
import { useStateValue } from '../state';
import { Position } from '../../types';
import useUseEnemyTurn from '../state/action-hooks/useUseEnemyTurn';
import useCheckCollision from '../../hooks/use-check-collision';

interface Props {
    skin: string,
    startPosition?: Position
}

const Npc: React.FC<Props> = ({ skin }) => {
    const [{ mapLoaded, playerTurn }] = useStateValue();
    const { useEnemyTurn } = useUseEnemyTurn();
    const { getRandomDirection } = useWander();
    const { checkCollision } = useCheckCollision();
    const { walk, position } = useWalk();
    const { dir, step, setAnimState } = useAnimation(3);

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
