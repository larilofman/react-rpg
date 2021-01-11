import React, { useEffect } from 'react';
import Floor from '../tile/floor';
import Wall from '../tile/wall';
import { TileType, Tile } from '../../types';
import { useStateValue } from '../state';
import useSetMap from '../state/action-hooks/useSetMap';
import useGenerateMap from '../../hooks/use-generate-map';

const Map: React.FC = () => {
    const [{ mapData, mapLoaded }] = useStateValue();
    const { setMap } = useSetMap();
    const { generateMap } = useGenerateMap();

    useEffect(() => {
        if (!mapLoaded) {
            const map = generateMap({ h: 22, w: 31 });
            setMap(map);
        }
    }, [mapLoaded]);

    useEffect(() => {
        console.log('mapDataChanged', mapLoaded);
    }, [mapData]);

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

    if (!mapData.tiles) return null;

    return (
        <>
            {mapData.tiles.map((row, index) => (
                <div key={index}>
                    {row.map((tile) => {
                        return tileToRender(tile);
                    })}
                </div>
            ))}
        </>
    );
};

export default Map;

