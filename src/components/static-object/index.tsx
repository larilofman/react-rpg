import React from 'react';
import Sprite from '../sprite';
import { Position } from '../../types';

interface Props {
    position: Position,
    sprite: string
}

const StaticObject: React.FC<Props> = ({ position = { x: 0, y: 0 }, sprite }) => {
    return <Sprite
        data={{
            offset_x: 0,
            offset_y: 0,
            image: sprite,
            layer: 1
        }}
        position={position}
    />;

};

export default StaticObject;
