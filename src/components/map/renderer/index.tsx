import React from 'react';
import Floor from '../../tile/floor';
import Wall from '../../tile/wall';
import { TileType, Tile, Position } from '../../../types';
import settings from '../../../data/settings.json';

interface Props {
    cameraPosition: Position
    zoneTiles: Tile[][]
    mapLoaded: boolean
}

const MapRenderer: React.FC<Props> = ({ zoneTiles, cameraPosition, mapLoaded }) => {

    const tilesOnCamera = React.useMemo(() => {
        const cam_y = cameraPosition.y;
        const cam_x = cameraPosition.x;
        const tilesOnCam: Tile[] = [];
        // Get tiles visible on camera and two tiles to each direction to avoid flickering
        for (let y = cam_y - 2; y < cam_y + settings.displaySize.h + 2; y++) {
            for (let x = cam_x - 2; x < cam_x + settings.displaySize.w + 2; x++) {
                if (zoneTiles[y] && zoneTiles[y][x]) {
                    tilesOnCam.push(zoneTiles[y][x]);
                }
            }
        }
        return tilesOnCam;
    }, [cameraPosition.x, cameraPosition.y, mapLoaded]);

    const tileToRender = (tile: Tile) => {
        switch (tile.type) {
            case TileType.floor:
                return <Floor key={tile.id} position={tile.position} spriteIndex={tile.spriteIndex} />;
            case TileType.wall:
                return <Wall key={tile.id} position={tile.position} spriteIndex={tile.spriteIndex} />;
            default:
                break;
        }
    };

    if (!zoneTiles.length) return null;

    return (
        <>
            {tilesOnCamera.map(t => {
                return tileToRender(t);
            })}
        </>
    );

};

const areEqual = (prevProps: Readonly<React.PropsWithChildren<Props>>, nextProps: Readonly<React.PropsWithChildren<Props>>) => {
    if (prevProps.cameraPosition.x !== nextProps.cameraPosition.x) return false;
    if (prevProps.cameraPosition.y !== nextProps.cameraPosition.y) return false;
    if (prevProps.mapLoaded !== nextProps.mapLoaded) return false;
    return true;
};

export default React.memo(MapRenderer, areEqual);
