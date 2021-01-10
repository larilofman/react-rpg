import { Direction } from '../../types';
import randomEnum from '../../utils/random-enum';

export default function useWander() {

    const getRandomDirection = (): Direction => {
        return randomEnum(Direction);
    };

    return {
        getRandomDirection
    };
}

