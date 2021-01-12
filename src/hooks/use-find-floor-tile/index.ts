import { Tile } from '../../types';
import { useStateValue } from '../../components/state';

export default function useFindRandomFloorTile() {
    const [{ mapData }] = useStateValue();

    const findFloorTile = () => {
        const floorTiles: Tile[] = [];
        for (let y = 0; y < mapData.tiles.length; y++) {
            for (let x = 0; x < mapData.tiles[y].length; x++) {
                if (mapData.tiles[y][x].passable) {
                    floorTiles.push(mapData.tiles[y][x]);
                }
            }
        }
        return floorTiles[Math.floor(Math.floor(Math.random() * floorTiles.length))];
    };

    return { findFloorTile };
}