import { expect } from "@jest/globals";
import theoretically from "jest-theories";
import { COLORS, SIDES } from "../src/objs/constants";
import { createCube } from "../src/objs/creator";
import { findPositions, findSideColor } from "../src/objs/finder";

describe("Find side color from Cube", () => {
    const cube = createCube(3);
    const theories = [
        { input: { cube: cube, side: SIDES.FRONT}, expected: COLORS.ORANGE },
        { input: { cube: cube, side: SIDES.UP}, expected: COLORS.YELLOW },
        { input: { cube: cube, side: SIDES.LEFT}, expected: COLORS.GREEN },
        { input: { cube: cube, side: SIDES.BACK}, expected: COLORS.RED },
        { input: { cube: cube, side: SIDES.DOWN}, expected: COLORS.WHITE },
        { input: { cube: cube, side: SIDES.RIGHT}, expected: COLORS.BLUE },
    ];
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(findSideColor(theory.input.cube, theory.input.side)).toEqual(theory.expected);
    })
});


describe("Find positions from Cube", () => {
    const theories = [
        { input: { size: 3, axis: { z: 0 }}, expected: [0,1,2,3,4,5,6,7,8] },
    ];
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(findPositions(theory.input.size, {...theory.input.axis})).toEqual(theory.expected);
    })
});