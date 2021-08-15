import { expect } from "@jest/globals";
import theoretically from "jest-theories";
import { basicF2LCornerAlgorithm } from "../src/objs/algotithms/basic-f2l-c-algorithm";
import { basicF2LEdgeAlgorithm } from "../src/objs/algotithms/basic-f2l-e-algorithm";
import { basicOLLCornerAlgorithm } from "../src/objs/algotithms/basic-oll-c-algorithm";
import { basicOLLEdgeAlgorithm } from "../src/objs/algotithms/basic-oll-e-algorithm";
import { basicPllCornerAlgorithm } from "../src/objs/algotithms/basic-pll-c-algorithm";
import { basicPllEdgeAlgorithm } from "../src/objs/algotithms/basic-pll-e.algorithm";
import { crossAlgorithm } from "../src/objs/algotithms/cross-algorithm";
import { f2lAlgorithm } from "../src/objs/algotithms/f2l-algorithm";
import { ollAlgorithm } from "../src/objs/algotithms/oll-algorithm";
import { pllAlgorithm } from "../src/objs/algotithms/pll-algorithm";
import { COLORS, POSITION, SIDES } from "../src/objs/constants";
import { createCube, createCubeWithPattern } from "../src/objs/creator";
import { findPositionsByAxis, findCubeColorBySide, findCenterPositionByColor, findEdgePositionByColor, findCornerPositionByColor, findCubeSideCrosses, findPLLAlgorithm, findCrossAlgorithm, findF2LAlgorithm, findOLLAlgorithm } from "../src/objs/finder";

describe("Find side color from Cube", () => {
    const cube = createCube(3);
    const theories = [
        { input: { cube: cube, side: SIDES.FRONT }, expected: COLORS.ORANGE },
        { input: { cube: cube, side: SIDES.UP }, expected: COLORS.YELLOW },
        { input: { cube: cube, side: SIDES.LEFT }, expected: COLORS.GREEN },
        { input: { cube: cube, side: SIDES.BACK }, expected: COLORS.RED },
        { input: { cube: cube, side: SIDES.DOWN }, expected: COLORS.WHITE },
        { input: { cube: cube, side: SIDES.RIGHT }, expected: COLORS.BLUE },
    ];
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(findCubeColorBySide(theory.input.cube, theory.input.side)).toEqual(theory.expected);
    })
});


describe("Find positions from Cube", () => {
    const theories = [
        { input: { size: 3, axis: { z: 0 } }, expected: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
        { input: { size: 3, axis: { z: 0, y: 0 } }, expected: [0, 1, 2] },
        { input: { size: 3, axis: { z: 0, y: 0, x: 0 } }, expected: [0] },
        { input: { size: 3, axis: { x: 0 } }, expected: [0, 3, 6, 9, 12, 15, 18, 21, 24] },
        { input: { size: 3, axis: { x: 0, y: 0 } }, expected: [0, 9, 18] },
        { input: { size: 3, axis: { z: 0, y: 1, x: 2 } }, expected: [5] }
    ];
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(findPositionsByAxis(theory.input.size, { ...theory.input.axis })).toEqual(theory.expected);
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

describe("Find Cube Crosses", () => {
    const cube = createCube(3);
    const theories = [
        { input: cube, expected: [SIDES.FRONT, SIDES.UP, SIDES.LEFT, SIDES.BACK, SIDES.DOWN, SIDES.RIGHT] },
        {
            input: [[[[0, 1, 6, 2, 0, 0, 0], [0, 5, 6, 0, 0, 0, 0], [0, 4, 3, 0, 0, 0, 5]],
            [[0, 5, 0, 1, 0, 0, 0], [0, 5, 0, 0, 0, 0, 0], [0, 5, 0, 0, 0, 0, 4]],
            [[0, 5, 0, 4, 0, 6, 0], [0, 5, 0, 0, 0, 3, 0], [0, 5, 0, 0, 0, 1, 3]]],
            [[[0, 0, 3, 4, 0, 0, 0], [0, 0, 6, 0, 0, 0, 0], [0, 0, 6, 0, 0, 0, 2]],
            [[0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 4]],
            [[0, 0, 0, 1, 0, 6, 0], [0, 0, 0, 0, 0, 3, 0], [0, 0, 0, 0, 0, 3, 1]]],
            [[[0, 0, 5, 1, 6, 0, 0], [0, 0, 6, 0, 4, 0, 0], [0, 0, 2, 0, 3, 0, 4]],
            [[0, 0, 0, 3, 2, 0, 0], [0, 0, 0, 0, 2, 0, 0], [0, 0, 0, 0, 4, 0, 2]],
            [[0, 0, 0, 3, 1, 2, 0], [0, 0, 0, 0, 1, 2, 0], [0, 0, 0, 0, 6, 2, 4]]]],
            expected: [SIDES.FRONT]
        },
        {
            input: [[[[0,4,2,6,0,0,0],[0,3,5,0,0,0,0],[0,6,4,0,0,0,5]],
            [[0,1,0,6,0,0,0],[0,3,0,0,0,0,0],[0,6,0,0,0,0,2]],
            [[0,5,0,3,0,4,0],[0,3,0,0,0,1,0],[0,4,0,0,0,3,2]]],
            [[[0,0,5,1,0,0,0],[0,0,5,0,0,0,0],[0,0,5,0,0,0,4]],
            [[0,0,0,1,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,4]],
            [[0,0,0,2,0,3,0],[0,0,0,0,0,2,0],[0,0,0,0,0,6,4]]],
            [[[0,0,1,2,6,0,0],[0,0,5,0,6,0,0],[0,0,1,0,5,0,3]],
            [[0,0,0,4,2,0,0],[0,0,0,0,6,0,0],[0,0,0,0,3,0,4]],
            [[0,0,0,6,1,5,0],[0,0,0,0,1,2,0],[0,0,0,0,2,1,3]]]],
            expected: [SIDES.UP]
        },
        {
            input: [[[[0,4,5,3,0,0,0],[0,1,3,0,0,0,0],[0,3,4,0,0,0,2]],
            [[0,3,0,2,0,0,0],[0,2,0,0,0,0,0],[0,6,0,0,0,0,4]],
            [[0,5,0,6,0,1,0],[0,2,0,0,0,1,0],[0,1,0,0,0,2,3]]],
            [[[0,0,1,6,0,0,0],[0,0,3,0,0,0,0],[0,0,6,0,0,0,2]],
            [[0,0,0,1,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,4]],
            [[0,0,0,4,0,2,0],[0,0,0,0,0,6,0],[0,0,0,0,0,3,4]]],
            [[[0,0,4,6,2,0,0],[0,0,3,0,5,0,0],[0,0,6,0,4,0,5]],
            [[0,0,0,1,5,0,0],[0,0,0,0,5,0,0],[0,0,0,0,5,0,4]],
            [[0,0,0,2,1,6,0],[0,0,0,0,5,6,0],[0,0,0,0,1,5,3]]]],
            expected: [SIDES.BACK]
        }
    ];
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(findCubeSideCrosses(theory.input)).toEqual(theory.expected);
    })
});


describe("Find Cross Algorithm", () => {
    const theories = Object.values(crossAlgorithm.cases).map(_ => ({
        input: { algo: _ , cube: createCubeWithPattern(_.sample, 3) },
        expected: _.name
    }));
    theoretically('case {input.algo.name}', theories, theory => {
        let algo = findCrossAlgorithm(theory.input.cube);
        expect(algo.name).toEqual(theory.expected);
    })
});

describe("Find F2L Algorithm", () => {
    const theories = Object.values(f2lAlgorithm.cases).map(_ => ({
        input: { algo: _ , cube: createCubeWithPattern(_.sample, 3) },
        expected: _.name
    }));
    theoretically('case {input.algo.name}', theories, theory => {
        let algo = findF2LAlgorithm(theory.input.cube);
        expect(algo.name).toEqual(theory.expected);
    })
});

describe("Find OLL Algorithm", () => {
    const theories = Object.values(ollAlgorithm.cases).map(_ => ({
        input: { algo: _ , cube: createCubeWithPattern(_.sample, 3) },
        expected: _.name
    }));
    theoretically('case {input.algo.name}', theories, theory => {
        let algo = findOLLAlgorithm(theory.input.cube);
        expect(algo.name).toEqual(theory.expected);
    })
});


describe("Find PLL Algorithm", () => {
    const theories = Object.values(pllAlgorithm.cases).map(_ => ({
        input: { algo: _ , cube: createCubeWithPattern(_.sample, 3) },
        expected: _.name
    }));
    theoretically('case {input.algo.name}', theories, theory => {
        let algo = findPLLAlgorithm(theory.input.cube);
        expect(algo.name).toEqual(theory.expected);
    })
});


describe("Find Basic F2L Corner Algorithm", () => {
    const theories = Object.values(basicF2LCornerAlgorithm.cases).map(_ => ({
        input: { algo: _ , cube: createCubeWithPattern(_.sample, 3) },
        expected: _.name
    }));
    theoretically('case {input.algo.name}', theories, theory => {
        let algo = findF2LAlgorithm(theory.input.cube, POSITION.CORNER);
        expect(algo.name).toEqual(theory.expected);
    })
});

describe("Find Basic F2L Edge Algorithm", () => {
    const theories = Object.values(basicF2LEdgeAlgorithm.cases).map(_ => ({
        input: { algo: _ , cube: createCubeWithPattern(_.sample, 3) },
        expected: _.name
    }));
    theoretically('case {input.algo.name}', theories, theory => {
        let algo = findF2LAlgorithm(theory.input.cube, POSITION.EDGE);
        expect(algo.name).toEqual(theory.expected);
    })
});



describe("Find Basic OLL Edge Algorithm", () => {
    const theories = Object.values(basicOLLEdgeAlgorithm.cases).map(_ => ({
        input: { algo: _ , cube: createCubeWithPattern(_.sample, 3) },
        expected: _.name
    }));
    theoretically('case {input.algo.name}', theories, theory => {
        let algo = findOLLAlgorithm(theory.input.cube, POSITION.EDGE);
        expect(algo.name).toEqual(theory.expected);
    })
});

describe("Find Basic OLL Corner Algorithm", () => {
    const theories = Object.values(basicOLLCornerAlgorithm.cases).map(_ => ({
        input: { algo: _ , cube: createCubeWithPattern(_.sample, 3) },
        expected: _.name
    }));
    theoretically('case {input.algo.name}', theories, theory => {
        let algo = findOLLAlgorithm(theory.input.cube, POSITION.CORNER);
        expect(algo.name).toEqual(theory.expected);
    })
});



describe("Find Basic PLL Corner Algorithm", () => {
    const theories = Object.values(basicPllCornerAlgorithm.cases).map(_ => ({
        input: { algo: _ , cube: createCubeWithPattern(_.sample, 3) },
        expected: _.name
    }));
    theoretically('case {input.algo.name}', theories, theory => {
        let algo = findPLLAlgorithm(theory.input.cube, POSITION.CORNER);
        expect(algo.name).toEqual(theory.expected);
    })
});

describe("Find Basic PLL Edge Algorithm", () => {
    const theories = Object.values(basicPllEdgeAlgorithm.cases).map(_ => ({
        input: { algo: _ , cube: createCubeWithPattern(_.sample, 3) },
        expected: _.name
    }));
    theoretically('case {input.algo.name}', theories, theory => {
        let algo = findPLLAlgorithm(theory.input.cube, POSITION.EDGE);
        expect(algo.name).toEqual(theory.expected);
    })
});