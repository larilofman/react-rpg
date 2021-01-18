import React from 'react';
import Sprite from '../sprite';
import { Position, SpriteData } from '../../types';

interface Props {
    position: Position,
    spriteData: SpriteData
}

const Tile: React.FC<Props> = ({ position = { x: 0, y: 0 }, spriteData }) => {

    return <Sprite
        data={spriteData}
        position={position}
    />;

};

export default Tile;

