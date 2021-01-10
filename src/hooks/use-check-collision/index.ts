import { Position, Direction, Tile } from '../../types';
import { useStateValue } from '../../components/state';

export default function useCheckCollision() {
    const [{ mapData }] = useStateValue();

    const getTileAt = (pos: Position): Tile => {
        return mapData.tiles[(mapData.size.h * pos.y) + pos.x];
    };

    const checkCollision = (pos: Position) => {
        return getTileAt(pos).passable;
    };

    return {
        checkCollision
    };
}