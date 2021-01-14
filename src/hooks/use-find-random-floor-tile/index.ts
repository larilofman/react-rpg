import { Tile } from '../../types';
import { useStateValue } from '../../components/state';

export default function useFindRandomFloorTile() {
    const [{ zoneData }] = useStateValue();

    const findRandomFloorTile = () => {
        const floorTiles: Tile[] = [];
        for (let y = 0; y < zoneData.tiles.length; y++) {
            for (let x = 0; x < zoneData.tiles[y].length; x++) {
                if (zoneData.tiles[y][x].passable) {
                    floorTiles.push(zoneData.tiles[y][x]);
                }
            }
        }
        return floorTiles[Math.floor(Math.floor(Math.random() * floorTiles.length))];
    };

    return { findRandomFloorTile };
}