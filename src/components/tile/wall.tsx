import React from 'react';
import Tile from './index';
import { Position } from '../../types';

interface Props {
    position?: Position,
    collision?: boolean;
}

const Wall: React.FC<Props> = ({ position = { x: 8, y: 8 }, collision = true }) => {

    return <Tile
        spriteData={{
            offset_x: 3,
            offset_y: 2,
            image: `/sprites/skins/grasslands_1.png`,
            layer: 0
        }}
        position={position}
        collision={collision}
    />;

};

export default Wall;

