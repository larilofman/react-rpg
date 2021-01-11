import React from 'react';
import Tile from './index';
import { Position } from '../../types';

interface Props {
    position?: Position,
    collision?: boolean;
    spriteIndex?: number
}

const Floor: React.FC<Props> = ({ position = { x: 0, y: 0 }, spriteIndex = 0 }) => {

    return <Tile
        spriteData={{
            offset_x: 0,
            offset_y: 0,
            image: `/sprites/skins/tiles/floor/sand/floor_sand_stone_${spriteIndex}.png`,
            layer: 0
        }}
        position={position}
    />;

};

export default Floor;

