import React from 'react';
import { useStateValue } from '../state';
import { Position, SpriteData } from '../../types';

interface Props {
    data: SpriteData,
    position: Position
}

const Sprite: React.FC<Props> = ({ data, position }) => {
    const [{ tileSize }] = useStateValue();
    const { offset_x, offset_y } = data;

    return (
        <div
            style={{
                position: "absolute",
                top: position.y * tileSize.h,
                left: position.x * tileSize.w,
                height: `${tileSize.h}px`,
                width: `${tileSize.w}px`,
                backgroundImage: `url(${data.image})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: `-${tileSize.w * offset_x}px -${tileSize.h * offset_y}px`,
                zIndex: data.layer
            }}>
        </div>
    );
};

export default Sprite;


