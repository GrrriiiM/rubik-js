import { expect, test } from "@jest/globals";
import theoretically from "jest-theories";
import { AXIS, CLOCK, SIDES } from "../src/objs/constants";
import { rotatePosition, rotateSide } from "../src/objs/rotator";


describe('Rotate Side', () => {
    const theories = [
        { input: [AXIS.Z, SIDES.FRONT, CLOCK.NORMAL], expected: SIDES.FRONT },
        { input: [AXIS.Z, SIDES.UP, CLOCK.NORMAL], expected: SIDES.RIGHT },
        { input: [AXIS.Z, SIDES.UP, CLOCK.ANTI], expected: SIDES.LEFT },

        { input: [AXIS.Y, SIDES.UP, CLOCK.NORMAL], expected: SIDES.UP },
        { input: [AXIS.Y, SIDES.FRONT, CLOCK.NORMAL], expected: SIDES.LEFT },
        { input: [AXIS.Y, SIDES.FRONT, CLOCK.ANTI], expected: SIDES.RIGHT },

        { input: [AXIS.X, SIDES.LEFT, CLOCK.NORMAL], expected: SIDES.LEFT },
        { input: [AXIS.X, SIDES.FRONT, CLOCK.NORMAL], expected: SIDES.DOWN },
        { input: [AXIS.X, SIDES.FRONT, CLOCK.ANTI], expected: SIDES.UP },
    ]
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(rotateSide(...theory.input)).toBe(theory.expected);
    })
});


describe('Rotate', () => {
    const theories = [
        { input: [AXIS.Z, 3, 0, CLOCK.NORMAL], expected: [[[6, 3, 0], [7, 4, 1], [8, 5, 2]], [[9, 10, 11], [12, 13, 14], [15, 16, 17]], [[18, 19, 20], [21, 22, 23], [24, 25, 26]]] },
        { input: [AXIS.Z, 3, 0, CLOCK.ANTI], expected: [[[2, 5, 8], [1, 4, 7], [0, 3, 6]], [[9, 10, 11], [12, 13, 14], [15, 16, 17]], [[18, 19, 20], [21, 22, 23], [24, 25, 26]]] },
        { input: [AXIS.Y, 3, 0, CLOCK.NORMAL], expected: [[[2, 11, 20], [3, 4, 5], [6, 7, 8]], [[1, 10, 19], [12, 13, 14], [15, 16, 17]], [[0, 9, 18], [21, 22, 23], [24, 25, 26]]] },
        { input: [AXIS.Y, 3, 0, CLOCK.ANTI], expected: [[[18, 9, 0], [3, 4, 5], [6, 7, 8]], [[19, 10, 1], [12, 13, 14], [15, 16, 17]], [[20, 11, 2], [21, 22, 23], [24, 25, 26]]] },
        { input: [AXIS.X, 3, 0, CLOCK.NORMAL], expected: [[[18, 1, 2], [9, 4, 5], [0, 7, 8]], [[21, 10, 11], [12, 13, 14], [3, 16, 17]], [[24, 19, 20], [15, 22, 23], [6, 25, 26]]] },
        { input: [AXIS.X, 3, 0, CLOCK.ANTI], expected: [[[6, 1, 2], [15, 4, 5], [24, 7, 8]], [[3, 10, 11], [12, 13, 14], [21, 16, 17]], [[0, 19, 20], [9, 22, 23], [18, 25, 26]]] },

        { input: [AXIS.Z, 3, 1, CLOCK.NORMAL], expected: [[[0, 1, 2], [3, 4, 5], [6, 7, 8]], [[15, 12, 9], [16, 13, 10], [17, 14, 11]], [[18, 19, 20], [21, 22, 23], [24, 25, 26]]] },
        { input: [AXIS.Z, 3, 1, CLOCK.ANTI], expected: [[[0, 1, 2], [3, 4, 5], [6, 7, 8]], [[11, 14, 17], [10, 13, 16], [9, 12, 15]], [[18, 19, 20], [21, 22, 23], [24, 25, 26]]] },
        { input: [AXIS.Y, 3, 1, CLOCK.NORMAL], expected: [[[0, 1, 2], [5, 14, 23], [6, 7, 8]], [[9, 10, 11], [4, 13, 22], [15, 16, 17]], [[18, 19, 20], [3, 12, 21], [24, 25, 26]]] },
        { input: [AXIS.Y, 3, 1, CLOCK.ANTI], expected: [[[0, 1, 2], [21, 12, 3], [6, 7, 8]], [[9, 10, 11], [22, 13, 4], [15, 16, 17]], [[18, 19, 20], [23, 14, 5], [24, 25, 26]]] },
        { input: [AXIS.X, 3, 1, CLOCK.NORMAL], expected: [[[0, 19, 2], [3, 10, 5], [6, 1, 8]], [[9, 22, 11], [12, 13, 14], [15, 4, 17]], [[18, 25, 20], [21, 16, 23], [24, 7, 26]]] },
        { input: [AXIS.X, 3, 1, CLOCK.ANTI], expected: [[[0, 7, 2], [3, 16, 5], [6, 25, 8]], [[9, 4, 11], [12, 13, 14], [15, 22, 17]], [[18, 1, 20], [21, 10, 23], [24, 19, 26]]] },

        { input: [AXIS.Z, 3, 2, CLOCK.NORMAL], expected: [[[0, 1, 2], [3, 4, 5], [6, 7, 8]], [[9, 10, 11], [12, 13, 14], [15, 16, 17]], [[24, 21, 18], [25, 22, 19], [26, 23, 20]]] },
        { input: [AXIS.Z, 3, 2, CLOCK.ANTI], expected: [[[0, 1, 2], [3, 4, 5], [6, 7, 8]], [[9, 10, 11], [12, 13, 14], [15, 16, 17]], [[20, 23, 26], [19, 22, 25], [18, 21, 24]]] },
        { input: [AXIS.Y, 3, 2, CLOCK.NORMAL], expected: [[[0, 1, 2], [3, 4, 5], [8, 17, 26]], [[9, 10, 11], [12, 13, 14], [7, 16, 25]], [[18, 19, 20], [21, 22, 23], [6, 15, 24]]] },
        { input: [AXIS.Y, 3, 2, CLOCK.ANTI], expected: [[[0, 1, 2], [3, 4, 5], [24, 15, 6]], [[9, 10, 11], [12, 13, 14], [25, 16, 7]], [[18, 19, 20], [21, 22, 23], [26, 17, 8]]] },
        { input: [AXIS.X, 3, 2, CLOCK.NORMAL], expected: [[[0, 1, 20], [3, 4, 11], [6, 7, 2]], [[9, 10, 23], [12, 13, 14], [15, 16, 5]], [[18, 19, 26], [21, 22, 17], [24, 25, 8]]] },
        { input: [AXIS.X, 3, 2, CLOCK.ANTI], expected: [[[0, 1, 8], [3, 4, 17], [6, 7, 26]], [[9, 10, 5], [12, 13, 14], [15, 16, 23]], [[18, 19, 2], [21, 22, 11], [24, 25, 20]]] },

    ]
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(rotatePosition(...theory.input)).toEqual(theory.expected);
    })
});

