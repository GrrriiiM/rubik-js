import { expect } from "@jest/globals";
import theoretically from "jest-theories";
import { cubeFromFlat, cubeToFlat } from "../src/objs/transformer";

describe('Cube to Flat', () => {
    const theories = [
        {
            input: [[[0, 1, 2], [3, 4, 5], [6, 7, 8]], [[9, 10, 11], [12, 13, 14], [15, 16, 17]], [[18, 19, 20], [21, 22, 23], [24, 25, 26]]],
            expected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
        },
    ]
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(cubeToFlat(theory.input)).toEqual(theory.expected);
    })
});

describe('Cube from Flat', () => {
    const theories = [
        {
            input: {
                flat: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
                size: 3
            },
            expected: [[[0, 1, 2], [3, 4, 5], [6, 7, 8]], [[9, 10, 11], [12, 13, 14], [15, 16, 17]], [[18, 19, 20], [21, 22, 23], [24, 25, 26]]]
        },
    ]
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(cubeFromFlat(theory.input.flat, theory.input.size)).toEqual(theory.expected);
    })
});