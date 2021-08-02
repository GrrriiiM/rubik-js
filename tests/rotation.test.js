import { expect, test } from "@jest/globals";
import theoretically from "jest-theories";
import { AXIS, CLOCK, SIDES } from "../src/objs/constants";
import { rotate, rotateSide } from "../src/objs/rotation";


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
    ]
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(rotate(...theory.input)).toEqual(theory.expected);
    })
});