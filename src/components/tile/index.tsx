import React from 'react';
import GameObject from '../game-object';
import { Position } from '../../types';

interface Props {
    skin: string,
    position: Position,
    collision: boolean;
}

const Tile: React.FC<Props> = ({ skin, position = { x: 0, y: 0 }, collision = true }) => {

    return <GameObject
        sprite={`/sprites/skins/${skin}.png`}
        position={position}
    // collision={collision}
    />;

};

export default Tile;

