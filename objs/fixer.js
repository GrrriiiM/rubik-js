import { SIDES } from "./constants.js";
import { MOVEMENTS, MOVEMENTS_STR } from "./movements.js";
import { rotateMovementsFromTo } from "./rotator.js";
import { invertClockMovement } from "./transformer.js";

export function fixMovementsRemoveY(movements) {
    let found = true;
    movements = movements.map(_ => _);
    while (found) {
        found = false;
        let index = movements.findIndex(_ => _ == MOVEMENTS.Y);
        if (index >= 0) {
            found = true;
            let movementsToRotate = movements.splice(index).splice(1);
            movementsToRotate = rotateMovementsFromTo(movementsToRotate, SIDES.FRONT, SIDES.RIGHT);
            movements = [...movements, ...movementsToRotate]
        }
    }
    return movements
}

export function fixRedundance(movements) {
    let found = true;
    movements = movements.map(_ => _);
    while (found) {
        found = false;
        for (let i = 0; i < movements.length-1; i++) {
            if (movements[i].str != movements[i+1].str 
                && movements[i].str.replace("'", "") == movements[i+1].str.replace("'", "")) {
                movements.splice(i, 2);
                found = true;
                break;
            }
        }
        if (found) continue;
        for (let i = 0; i < movements.length-2; i++) {
            if (movements[i].str == movements[i+1].str && movements[i].str == movements[i+2].str) {
                movements.splice(i, 3, invertClockMovement(movements[i]));
                found = true;
                break;
            }
        }

    }
    return movements;
}