import { TileType } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/redux-state/store';

export default function useFindRandomFloorTile() {
    const zoneTiles = useSelector((state: RootState) => state.zone.tiles);

    const findRandomFloorTile = () => {
        const floorTiles: TileType[] = [];
        for (let y = 0; y < zoneTiles.length; y++) {
            for (let x = 0; x < zoneTiles[y].length; x++) {
                if (zoneTiles[y][x].passable) {
                    floorTiles.push(zoneTiles[y][x]);
                }
            }
        }
        return floorTiles[Math.floor(Math.floor(Math.random() * floorTiles.length))];
    };

    return { findRandomFloorTile };
}