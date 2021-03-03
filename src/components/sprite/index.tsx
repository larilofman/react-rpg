import React from 'react';
import { Position, SpriteData } from '../../types/general';
import { tileSize } from '../../data/settings/general';
import { useSelector } from 'react-redux';
import { RootState } from '../redux-state/store';

interface Props {
    data: SpriteData,
    position: Position
}

const Sprite: React.FC<Props> = ({ data, position }) => {
    const cameraPosition = useSelector((state: RootState) => state.cameraPosition);
    const { offset_x, offset_y } = data;

    // for future FoV tiles
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    // backgroundBlendMode: "darken",

    return (
        <div
            style={{
                position: "absolute",
                top: position.y * tileSize.h - (cameraPosition.y * tileSize.h),
                left: position.x * tileSize.w - (cameraPosition.x * tileSize.w),
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

const areEqual = (prevProps: Readonly<React.PropsWithChildren<Props>>, nextProps: Readonly<React.PropsWithChildren<Props>>) => {
    if (prevProps.position.x !== nextProps.position.x) return false;
    if (prevProps.position.y !== prevProps.position.y) return false;
    if (prevProps.data.image !== nextProps.data.image) return false;
    if (prevProps.data.offset_x !== nextProps.data.offset_x) return false;
    if (prevProps.data.offset_y !== nextProps.data.offset_y) return false;
    if (prevProps.data.layer !== nextProps.data.layer) return false;
    return true;
};


export default React.memo(Sprite, areEqual);

