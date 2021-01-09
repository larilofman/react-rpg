import React from 'react';
import Sprite from '../sprite';


export default function GameObject({ sprite, position = { x: 0, y: 0 }, step = 0, dir = 0 }, collision = false) {

    return (
        <div>
            <Sprite
                image={sprite}
                position={position}
                data={{ step, dir }}
            />
        </div>
    );
}
