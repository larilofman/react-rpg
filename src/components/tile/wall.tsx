import React from 'react';
import Tile from './index';
import { Position } from '../../types';

interface Props {
    position?: Position,
    spriteIndex?: number
}

const Wall: React.FC<Props> = ({ position = { x: 0, y: 0 }, spriteIndex = 0 }) => {

    return <Tile
        spriteData={{
            offset_x: 0,
            offset_y: 0,
            image: `/sprites/skins/tiles/wall/vines/wall_vines_${spriteIndex}.png`,
            layer: 0
        }}
        position={position}
    />;

};

export default Wall;

