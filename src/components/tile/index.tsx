import React from 'react';
import GameObject from '../game-object';
import { Position, SpriteData } from '../../types';

interface Props {
    position: Position,
    collision: boolean;
    spriteData: SpriteData
}

const Tile: React.FC<Props> = ({ position = { x: 0, y: 0 }, spriteData, collision = true }) => {

    return <GameObject
        spriteData={spriteData}
        position={position}
        collision={collision}
    />;

};

export default Tile;

