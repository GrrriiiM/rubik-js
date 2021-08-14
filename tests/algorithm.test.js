import { expect, test } from "@jest/globals";
import { TestScheduler } from "jest";
import theoretically from "jest-theories";
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


describe('F2L algorithm', () => {
    const expected = f2lAlgorithm.sample
    const theories = Object.values(f2lAlgorithm.cases).map(_ => ({ input: _, expected }));
    theoretically('case {input.name}', theories, theory => {
        let cube = createCubeWithPattern(theory.input.sample || CUBE_DEFAULT_PATTERN, 3);
        movementsFromNotation(theory.input.moves).forEach(_ => cube = rotateCubeWithMovement(cube, _));
        expect(cubeToPattern(cube)).toEqual(theory.expected);
    });
});



describe('OLL algorithm', () => {
    const expected = ollAlgorithm.sample
    const theories = Object.values(ollAlgorithm.cases).map(_ => ({ input: _, expected }));
    theoretically('case {input.name}', theories, theory => {
        let cube = createCubeWithPattern(theory.input.sample || CUBE_DEFAULT_PATTERN, 3);
        movementsFromNotation(theory.input.moves).forEach(_ => cube = rotateCubeWithMovement(cube, _));
        expect(cubeToPattern(cube)).toEqual(theory.expected);
    })
});


describe('PLL algorithm', () => {
    const theories = Object.values(pllAlgorithm.cases).map(_ => ({ input: _, expected: CUBE_DEFAULT_PATTERN }));
    theoretically('case {input.name}', theories, theory => {
        let cube = createCubeWithPattern(theory.input.sample || CUBE_DEFAULT_PATTERN);
        movementsFromNotation(theory.input.moves).forEach(_ => cube = rotateCubeWithMovement(cube, _));
        expect(cubeToPattern(cube)).toEqual(theory.expected);
    });
});
