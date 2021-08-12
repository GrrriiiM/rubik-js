import { expect, test } from "@jest/globals";
import theoretically from "jest-theories";
import { ollAlgorithm } from "../src/objs/algotithms/oll-algorithm";
import { pllAlgorithm } from "../src/objs/algotithms/pll-algorithm";
import { COLORS } from "../src/objs/constants";
import { createCube, createCubeEmpty, createCubeWithPattern, CUBE_DEFAULT_PATTERN } from "../src/objs/creator";
import { MOVEMENTS } from "../src/objs/movements";
import { rotateCubeFromTo, rotateCubeWithMovement, rotateCubeWithNotation } from "../src/objs/rotator";
import { cloneCube, cubeFromFlat, cubeToFlat, cubeToPattern, movementsFromNotation } from "../src/objs/transformer";

describe('OLL algorithm', () => {
    const expected = "BBBBBBBBBYYYYYYYYYBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
    const theories = Object.values(ollAlgorithm.cases).map(_ => ({ input: _, expected }));
    theoretically('case {input.name}', theories, theory => {
        let cube = createCubeEmpty(3);
        let cubeFlat = cubeToFlat(cube);
        ollAlgorithm.positions.forEach((_, i) => cubeFlat[_][theory.input.sides[i]] = COLORS.YELLOW);
        cube = cubeFromFlat(cubeFlat);
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
