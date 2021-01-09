import React from 'react';
import Sprite from '../sprite';
import { Position, SpriteData } from '../../types';

interface Props {
    position: Position,
    spriteData: SpriteData
    collision?: boolean
}

const GameObject: React.FC<Props> = ({ position = { x: 0, y: 0 }, spriteData }, collision = false) => {

    return (
        <div>
            <Sprite
                position={position}
                data={spriteData}
            />
        </div>
    );
};

export default GameObject;