import { Position, Dimensions, Rectangle } from '../types';

export function collision(rect1: Rectangle, rect2: Rectangle) {

    return (rect1.pos.x < rect2.pos.x + rect2.size.w &&
        rect1.pos.x + rect1.size.w > rect2.pos.x &&
        rect1.pos.y < rect2.pos.y + rect2.size.h &&
        rect1.pos.y + rect1.size.h > rect2.pos.y);
}

// export function collision(rect1: { pos: Position, size: Dimensions }, rect2: { pos: Position, size: Dimensions }) {

//     return (rect1.pos.x < rect2.pos.x + rect2.size.w &&
//         rect1.pos.x + rect1.size.w > rect2.pos.x &&
//         rect1.pos.y < rect2.pos.y + rect2.size.h &&
//         rect1.pos.y + rect1.size.h > rect2.pos.y);
// }

export function collisionWithAny(rect1: Rectangle, targets: Rectangle[]) {

    for (let i = 0; i < targets.length; i++) {
        if (collision(rect1, targets[i])) {
            console.log('collided');
            return true;
        }
    }
    console.log("didn't collide");
    return false;
}