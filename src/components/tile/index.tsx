import React from 'react';
import Sprite from '../sprite';
import { Position } from '../../types/general';

interface Props {
    position: Position,
    spriteURL: string,
    spriteIndex: number
}

const Tile: React.FC<Props> = ({ position = { x: 0, y: 0 }, spriteURL, spriteIndex }) => {

    return <Sprite
        data={{
            offset_x: 0,
            offset_y: 0,
            image: `/sprites/tiles/${spriteURL}_${spriteIndex}.png`,
            layer: 0
        }}
        position={position}
    />;

};

export default Tile;

