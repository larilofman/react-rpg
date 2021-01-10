import { Position, Tile } from '../../types';
import { useStateValue } from '../../components/state';

export default function useCheckCollision() {
    const [{ mapData }] = useStateValue();

    const isInBounds = (pos: Position): boolean => {
        return (
            mapData.size.h > pos.y &&
            mapData.size.w > pos.x &&
            pos.y >= 0 &&
            pos.x >= 0
        );
    };

    const getTileAt = (pos: Position): Tile | undefined => {
        if (isInBounds(pos)) {
            return mapData.tiles[pos.y][pos.x];
        }
    };

    const checkCollision = (pos: Position) => {
        const tile = getTileAt(pos);
        return !tile ? false : tile.passable;
        // return getTileAt(pos).passable;
    };

    return {
        checkCollision
    };
}