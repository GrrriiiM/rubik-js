import { expect, test } from "@jest/globals";
import { TestScheduler } from "jest";
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
import { COLORS } from "../src/objs/constants";
import { createCube, createCubeEmpty, createCubeWithPattern, CUBE_DEFAULT_PATTERN } from "../src/objs/creator";
import { MOVEMENTS } from "../src/objs/movements";
import { rotateCubeFromTo, rotateCubeWithMovement, rotateCubeWithNotation } from "../src/objs/rotator";
import { cloneCube, cubeFromFlat, cubeToFlat, cubeToPattern, movementsFromNotation } from "../src/objs/transformer";

describe('Cross algorithm', () => {
    const expected = crossAlgorithm.sample
    const theories = Object.values(crossAlgorithm.cases).map(_ => ({ input: _, expected }));
    theoretically('case {input.name}', theories, theory => {
        let cube = createCubeWithPattern(theory.input.sample || CUBE_DEFAULT_PATTERN, 3);
        movementsFromNotation(theory.input.moves).forEach(_ => cube = rotateCubeWithMovement(cube, _));
        expect(cubeToPattern(cube)).toEqual(theory.expected);
    });
});

describe('Basic F2L Corner algorithm', () => {
    const expected = basicF2LCornerAlgorithm.sample
    const theories = Object.values(basicF2LCornerAlgorithm.cases).map(_ => ({ input: _, expected }));
    theoretically('case {input.name}', theories, theory => {
        let cube = createCubeWithPattern(theory.input.sample, 3);
        movementsFromNotation(theory.input.moves).forEach(_ => cube = rotateCubeWithMovement(cube, _));
        expect(cubeToPattern(cube)).toEqual(theory.expected);
    });
});

describe('Basic F2L Edge algorithm', () => {
    const expected = basicF2LEdgeAlgorithm.sample
    const theories = Object.values(basicF2LEdgeAlgorithm.cases).map(_ => ({ input: _, expected }));
    theoretically('case {input.name}', theories, theory => {
        let cube = createCubeWithPattern(theory.input.sample, 3);
        movementsFromNotation(theory.input.moves).forEach(_ => cube = rotateCubeWithMovement(cube, _));
        expect(cubeToPattern(cube)).toEqual(theory.expected);
    });
});


describe('Basic OLL Edge algorithm', () => {
    const expected = basicOLLEdgeAlgorithm.sample
    const theories = Object.values(basicOLLEdgeAlgorithm.cases).map(_ => ({ input: _, expected }));
    theoretically('case {input.name}', theories, theory => {
        let cube = createCubeWithPattern(theory.input.sample, 3);
        movementsFromNotation(theory.input.moves).forEach(_ => cube = rotateCubeWithMovement(cube, _));
        expect(cubeToPattern(cube)).toEqual(theory.expected);
    });
});

describe('Basic OLL Corner algorithm', () => {
    const expected = basicOLLCornerAlgorithm.sample
    const theories = Object.values(basicOLLCornerAlgorithm.cases).map(_ => ({ input: _, expected }));
    theoretically('case {input.name}', theories, theory => {
        let cube = createCubeWithPattern(theory.input.sample, 3);
        movementsFromNotation(theory.input.moves).forEach(_ => cube = rotateCubeWithMovement(cube, _));
        expect(cubeToPattern(cube)).toEqual(theory.expected);
    });
});

describe('Basic PLL Corner algorithm', () => {
    const expected = basicPllCornerAlgorithm.sample
    const theories = Object.values(basicPllCornerAlgorithm.cases).map(_ => ({ input: _, expected }));
    theoretically('case {input.name}', theories, theory => {
        let cube = createCubeWithPattern(theory.input.sample, 3);
        movementsFromNotation(theory.input.moves).forEach(_ => cube = rotateCubeWithMovement(cube, _));
        expect(cubeToPattern(cube)).toEqual(theory.expected);
    });
});

describe('Basic PLL Edge algorithm', () => {
    const expected = basicPllEdgeAlgorithm.sample
    const theories = Object.values(basicPllEdgeAlgorithm.cases).map(_ => ({ input: _, expected }));
    theoretically('case {input.name}', theories, theory => {
        let cube = createCubeWithPattern(theory.input.sample, 3);
        movementsFromNotation(theory.input.moves).forEach(_ => cube = rotateCubeWithMovement(cube, _));
        expect(cubeToPattern(cube)).toEqual(theory.expected);
    });
});

describe('Advanced F2L algorithm', () => {
    const expected = f2lAlgorithm.sample
    const theories = Object.values(f2lAlgorithm.cases).map(_ => ({ input: _, expected }));
    theoretically('case {input.name}', theories, theory => {
        let cube = createCubeWithPattern(theory.input.sample || CUBE_DEFAULT_PATTERN, 3);
        movementsFromNotation(theory.input.moves).forEach(_ => cube = rotateCubeWithMovement(cube, _));
        expect(cubeToPattern(cube)).toEqual(theory.expected);
    });
});



describe('Advanced OLL algorithm', () => {
    const expected = ollAlgorithm.sample
    const theories = Object.values(ollAlgorithm.cases).map(_ => ({ input: _, expected }));
    theoretically('case {input.name}', theories, theory => {
        let cube = createCubeWithPattern(theory.input.sample || CUBE_DEFAULT_PATTERN, 3);
        movementsFromNotation(theory.input.moves).forEach(_ => cube = rotateCubeWithMovement(cube, _));
        expect(cubeToPattern(cube)).toEqual(theory.expected);
    })
});


describe('Advanced PLL algorithm', () => {
    const theories = Object.values(pllAlgorithm.cases).map(_ => ({ input: _, expected: CUBE_DEFAULT_PATTERN }));
    theoretically('case {input.name}', theories, theory => {
        let cube = createCubeWithPattern(theory.input.sample || CUBE_DEFAULT_PATTERN);
        movementsFromNotation(theory.input.moves).forEach(_ => cube = rotateCubeWithMovement(cube, _));
        expect(cubeToPattern(cube)).toEqual(theory.expected);
    });
});
