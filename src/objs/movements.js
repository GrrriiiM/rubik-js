import { AXIS, CLOCK, SIDES } from "./constants";
import { rotateBlocks } from "./rotation";

export class Movement {
    #side;
    #clock;
    #layers;
    constructor(side = SIDES.FRONT, clock = CLOCK.NORMAL, layers = [0]) {
        this.#side = side;
        this.#clock = clock;
        this.#layers = layers;
    }
    move(cube) {
        for(let layer in this.#layers) {
            if (this.#side == SIDES.FRONT) cube = new Cube(rotateBlocks(AXIS.Z, cube.blocks, layer, this.#clock));
            if (this.#side == SIDES.UP) cube = new Cube(rotateBlocks(AXIS.Y, cube.blocks, layer, this.#clock));
            if (this.#side == SIDES.LEFT) cube = new Cube(rotateBlocks(AXIS.X, cube.blocks, layer, this.#clock));
            if (this.#side == SIDES.BACK) cube = new Cube(rotateBlocks(AXIS.Z, cube.blocks, cube.size - 1 - layer, !this.#clock));
            if (this.#side == SIDES.DOWN) cube = new Cube(rotateBlocks(AXIS.Y, cube.blocks, cube.size - 1 - layer, !this.#clock));
            if (this.#side == SIDES.RIGHT) cube = new Cube(rotateBlocks(AXIS.X, cube.blocks, cube.size - 1 - layer, !this.#clock));
        }
        return cube;
    }
}

export const MOVEMENTS = {
    F: new Movement(SIDES.FRONT),
    B: new Movement(SIDES.BACK),
    L: new Movement(SIDES.LEFT),
    R: new Movement(SIDES.RIGHT),
    U: new Movement(SIDES.UP),
    D_: new Movement(SIDES.DOWN, CLOCK.ANTI),
    F_: new Movement(SIDES.FRONT, CLOCK.ANTI),
    B_: new Movement(SIDES.BACK, CLOCK.ANTI),
    L_: new Movement(SIDES.LEFT, CLOCK.ANTI),
    R_: new Movement(SIDES.RIGHT, CLOCK.ANTI),
    U_: new Movement(SIDES.UP, CLOCK.ANTI),
    D_: new Movement(SIDES.DOWN, CLOCK.ANTI),
    fromString(str) {
        if (str.toUpperCase() == "F") return this.F;
        if (str.toUpperCase() == "B") return this.B;
        if (str.toUpperCase() == "L") return this.L;
        if (str.toUpperCase() == "R") return this.R;
        if (str.toUpperCase() == "U") return this.U;
        if (str.toUpperCase() == "D") return this.D;
        if (str.toUpperCase() == "F'") return this.F_;
        if (str.toUpperCase() == "B'") return this.B_;
        if (str.toUpperCase() == "L'") return this.L_;
        if (str.toUpperCase() == "R'") return this.R_;
        if (str.toUpperCase() == "U'") return this.U_;
        if (str.toUpperCase() == "D'") return this.D_;
    }
}