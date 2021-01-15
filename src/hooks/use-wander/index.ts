import { Direction, Position, Tile } from '../../types';
import randomEnum from '../../utils/random-enum';
import { useStateValue } from '../../components/state';

export default function useWander() {
    const [{ zoneData }] = useStateValue();

    const getRandomDirection = (): Direction => {
        return randomEnum(Direction);
    };

    const getRandomNearbyPos = (currentPos: Position): Position => {
        const dir = getRandomDirection();
        switch (dir) {
            case Direction.down:
                return { x: currentPos.x, y: currentPos.y + 1 };
            case Direction.up:
                return { x: currentPos.x, y: currentPos.y - 1 };
            case Direction.right:
                return { x: currentPos.x + 1, y: currentPos.y };
            case Direction.left:
                return { x: currentPos.x - 1, y: currentPos.y };
            default:
                return currentPos;
        }
    };

    return {
        getRandomDirection, getRandomNearbyPos
    };
}

