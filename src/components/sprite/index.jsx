import React from 'react';
import { useStateValue } from '../state';

export default function Sprite({ image, data, position }) {
    const [{ tileSize }] = useStateValue();
    const { step, dir } = data;

    return (
        <div
            style={{
                position: "absolute",
                top: position.y * tileSize.h,
                left: position.x * tileSize.w,
                height: `${tileSize.h}px`,
                width: `${tileSize.w}px`,
                backgroundImage: `url(${image})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: `-${tileSize.w * step}px -${tileSize.h * dir}px`
            }}>
        </div>
    );
}


