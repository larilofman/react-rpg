import { Direction, Position } from '../../types';
import randomEnum from '../../utils/random-enum';

export default function useWander() {

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
            case Direction.upLeft:
                return { x: currentPos.x - 1, y: currentPos.y - 1 };
            case Direction.upRight:
                return { x: currentPos.x + 1, y: currentPos.y - 1 };
            case Direction.downRight:
                return { x: currentPos.x + 1, y: currentPos.y + 1 };
            case Direction.downLeft:
                return { x: currentPos.x - 1, y: currentPos.y + 1 };
            default:
                return currentPos;
        }
    };

    return {
        getRandomDirection, getRandomNearbyPos
    };
}

