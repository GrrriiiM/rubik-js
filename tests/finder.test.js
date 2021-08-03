import { expect } from "@jest/globals";
import theoretically from "jest-theories";
import { COLORS, SIDES } from "../src/objs/constants";
import { createCube } from "../src/objs/creator";
import { findPositionsByAxis, findCubeColorBySide, findCenterPositionByColor, findEdgePositionByColor, findCornerPositionByColor } from "../src/objs/finder";

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
        expect(findCubeColorBySide(theory.input.cube, theory.input.side)).toEqual(theory.expected);
    })
});


describe("Find positions from Cube", () => {
    const theories = [
        { input: { size: 3, axis: { z: 0 }}, expected: [0,1,2,3,4,5,6,7,8] },
        { input: { size: 3, axis: { z: 0, y: 0 }}, expected: [0,1,2] },
        { input: { size: 3, axis: { z: 0, y: 0, x: 0 }}, expected: [0] },
        { input: { size: 3, axis: { x: 0 }}, expected: [0,3,6,9,12,15,18,21,24] },
        { input: { size: 3, axis: { x: 0, y: 0 }}, expected: [0,9,18] },
        { input: { size: 3, axis: { z: 0, y: 1, x: 2 }}, expected: [5] }
    ];
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(findPositionsByAxis(theory.input.size, {...theory.input.axis})).toEqual(theory.expected);
    })
});



describe("Find Center position from Color", () => {
    const cube = createCube(3);
    const theories = [
        { input: { cube: cube, color: COLORS.ORANGE }, expected: 4 },
        { input: { cube: cube, color: COLORS.YELLOW }, expected: 10 },
        { input: { cube: cube, color: COLORS.GREEN }, expected: 12 },
        { input: { cube: cube, color: COLORS.RED }, expected: 22 },
        { input: { cube: cube, color: COLORS.WHITE }, expected: 16 },
        { input: { cube: cube, color: COLORS.BLUE }, expected: 14 },
    ];
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(findCenterPositionByColor(theory.input.cube, theory.input.color)).toEqual(theory.expected);
    })
});



describe("Find Edge position from Color", () => {
    const cube = createCube(3);
    const theories = [
        { input: { cube: cube, color1: COLORS.ORANGE, color2: COLORS.YELLOW }, expected: 1 },
        { input: { cube: cube, color1: COLORS.ORANGE, color2: COLORS.WHITE }, expected: 7 },
        { input: { cube: cube, color1: COLORS.GREEN, color2: COLORS.ORANGE }, expected: 3 },
        { input: { cube: cube, color1: COLORS.BLUE, color2: COLORS.RED }, expected: 23 },
        { input: { cube: cube, color1: COLORS.GREEN, color2: COLORS.WHITE }, expected: 15 },
        { input: { cube: cube, color1: COLORS.ORANGE, color2: COLORS.BLUE }, expected: 5 },
        { input: { cube: cube, color1: COLORS.ORANGE, color2: COLORS.RED }, expected: -1 },
    ];
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(findEdgePositionByColor(theory.input.cube, theory.input.color1, theory.input.color2)).toEqual(theory.expected);
    })
});



describe("Find Corder position from Color", () => {
    const cube = createCube(3);
    const theories = [
        { input: { cube: cube, color1: COLORS.ORANGE, color2: COLORS.YELLOW, color3: COLORS.GREEN }, expected: 0 },
        { input: { cube: cube, color1: COLORS.RED, color2: COLORS.YELLOW, color3: COLORS.GREEN }, expected: 18 },
        { input: { cube: cube, color1: COLORS.WHITE, color2: COLORS.BLUE, color3: COLORS.RED }, expected: 26 },
        { input: { cube: cube, color1: COLORS.GREEN, color2: COLORS.ORANGE, color3: COLORS.WHITE }, expected: 6 },
        { input: { cube: cube, color1: COLORS.RED, color2: COLORS.YELLOW, color3: COLORS.BLUE }, expected: 20 },
        { input: { cube: cube, color1: COLORS.ORANGE, color2: COLORS.YELLOW, color3: COLORS.RED }, expected: -1 },
    ];
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(findCornerPositionByColor(theory.input.cube, theory.input.color1, theory.input.color2, theory.input.color3)).toEqual(theory.expected);
    })
});