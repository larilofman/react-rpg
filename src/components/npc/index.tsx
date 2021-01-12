import React, { useEffect } from 'react';
import GameObject from '../game-object';
import useWalk from '../../hooks/use-walk';
import useWander from '../../hooks/use-wander';
import { useStateValue } from '../state';
import { Position } from '../../types';
import useUseEnemyTurn from '../state/action-hooks/useUseEnemyTurn';

interface Props {
    skin: string,
    startPosition?: Position
}

const Npc: React.FC<Props> = ({ skin }) => {
    const [{ mapLoaded, playerTurn }] = useStateValue();
    const { useEnemyTurn } = useUseEnemyTurn();
    const { getRandomDirection } = useWander();

    const { dir, step, walk, position } = useWalk(3, 1);

    useEffect(() => {
        if (mapLoaded) {
            if (!playerTurn) {
                walk(getRandomDirection());
                useEnemyTurn();
            }
        }
    }, [playerTurn, mapLoaded]);

    // useEffect(() => {
    //     walk(Direction.left);
    // }, []);

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
