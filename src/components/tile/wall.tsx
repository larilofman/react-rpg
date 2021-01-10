import React from 'react';
import Tile from './index';
import { Position } from '../../types';

interface Props {
    position?: Position,
}

const Wall: React.FC<Props> = ({ position = { x: 0, y: 0 } }) => {

    return <Tile
        spriteData={{
            offset_x: 3,
            offset_y: 2,
            image: `/sprites/skins/grasslands_1.png`,
            layer: 0
        }}
        position={position}
    />;

};

export default Wall;

