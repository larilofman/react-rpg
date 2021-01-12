import { Rectangle } from '../types';

export function collision(rect1: Rectangle, rect2: Rectangle, gap = 0) {

    return (rect1.pos.x < rect2.pos.x + rect2.size.w + gap &&
        rect1.pos.x + rect1.size.w > rect2.pos.x - gap &&
        rect1.pos.y < rect2.pos.y + rect2.size.h + gap &&
        rect1.pos.y + rect1.size.h > rect2.pos.y - gap);
}

export function collisionWithAny(rect1: Rectangle, targets: Rectangle[], gap = 0) {

    for (let i = 0; i < targets.length; i++) {
        if (collision(rect1, targets[i], gap)) {
            return true;
        }
    }
    return false;
}