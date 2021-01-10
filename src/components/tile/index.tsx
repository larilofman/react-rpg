import React from 'react';
import GameObject from '../game-object';
import { Position, SpriteData } from '../../types';

interface Props {
    position: Position,
    spriteData: SpriteData
}

const Tile: React.FC<Props> = ({ position = { x: 0, y: 0 }, spriteData }) => {

    return <GameObject
        spriteData={spriteData}
        position={position}
    />;

};

export default Tile;

