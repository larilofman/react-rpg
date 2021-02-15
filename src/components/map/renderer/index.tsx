import React from 'react';
import { TileType, Position } from '../../../types';
import { displaySize } from '../../../data/settings/general';
import { useStore } from 'react-redux';
import { RootState } from '../../redux-state/store';
import Tile from '../../tile';

interface Props {
    cameraPosition: Position
    tilesLoaded: boolean
}

const MapRenderer: React.FC<Props> = ({ cameraPosition, tilesLoaded }) => {

    const zoneTiles = useStore<RootState>().getState().zone.tiles;

    const tilesOnCamera = React.useMemo(() => {
        const cam_y = cameraPosition.y;
        const cam_x = cameraPosition.x;
        const tilesOnCam: TileType[] = [];
        // Get tiles visible on camera and two tiles to each direction to avoid flickering
        for (let y = cam_y - 2; y < cam_y + displaySize.h + 2; y++) {
            for (let x = cam_x - 2; x < cam_x + displaySize.w + 2; x++) {
                if (zoneTiles[y] && zoneTiles[y][x]) {
                    tilesOnCam.push(zoneTiles[y][x]);
                }
            }
        }
        return tilesOnCam;
    }, [cameraPosition.x, cameraPosition.y, tilesLoaded]);

    const tileToRender = (tile: TileType) => {
        return <Tile key={tile.id} position={tile.position} spriteURL={tile.spriteURL} spriteIndex={tile.spriteIndex} />;
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
    if (prevProps.tilesLoaded !== nextProps.tilesLoaded) return false;
    return true;
};

export default React.memo(MapRenderer, areEqual);

