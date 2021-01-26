import React from 'react';
import { useStateValue } from '../state';
import { Position, SpriteData } from '../../types';

interface Props {
    data: SpriteData,
    position: Position
}

const Sprite: React.FC<Props> = ({ data, position }) => {
    const [{ tileSize, cameraPosition }] = useStateValue();
    const { offset_x, offset_y } = data;

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

export default Sprite;



// import React from 'react';
// import { useStateValue } from '../state';
// import { Dimensions, Position, SpriteData } from '../../types';

// interface Props {
//     data: SpriteData,
//     position: Position
// }

// const Sprite: React.FC<Props> = ({ data, position }) => {
//     const [{ tileSize, cameraPosition, displaySize }] = useStateValue();

//     const isVisible = (pos: Position) => {
//         if (pos.x + 2 >= cameraPosition.x &&
//             pos.x < cameraPosition.x + displaySize.w + 2 &&
//             pos.y + 2 >= cameraPosition.y &&
//             pos.y < cameraPosition.y + displaySize.h + 2) {
//             return true;
//         }
//         return false;
//     };

//     if (isVisible(position)) {
//         return <InnerSprite data={data} position={position} cameraPosition={cameraPosition} tileSize={tileSize} />;
//     } else {
//         return null;
//     }
// };

// interface InnerProps extends Props {
//     cameraPosition: Position
//     tileSize: Dimensions
// }

// const InnerSprite: React.FC<InnerProps> = ({ data, position, cameraPosition, tileSize }) => {
//     const { offset_x, offset_y } = data;
//     return (
//         <div
//             style={{
//                 position: "absolute",
//                 top: position.y * tileSize.h - (cameraPosition.y * tileSize.h),
//                 left: position.x * tileSize.w - (cameraPosition.x * tileSize.w),
//                 height: `${tileSize.h}px`,
//                 width: `${tileSize.w}px`,
//                 backgroundImage: `url(${data.image})`,
//                 backgroundRepeat: "no-repeat",
//                 backgroundPosition: `-${tileSize.w * offset_x}px -${tileSize.h * offset_y}px`,
//                 zIndex: data.layer
//             }}>
//         </div>
//     );
// };

// export default Sprite;


