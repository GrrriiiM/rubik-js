import { describe } from "@jest/globals";
import theoretically from "jest-theories";
import { COLORS, SIDES } from "../src/objs/constants";
import { createCube, createCubeWithPattern, CUBE_DEFAULT_PATTERN } from "../src/objs/creator";
import { findCubeColorBySide, findCubeSideByColor } from "../src/objs/finder";
import { rotateCubeFromTo, shuffleCube } from "../src/objs/rotator";
import { solveCube } from "../src/objs/solver";
import { cubeToPattern } from "../src/objs/transformer";

describe("Solver Cube", () => {
    
    const theories = [...Array(20).keys()].map(() => ({ input: cubeToPattern(shuffleCube(createCube(3))), expected: CUBE_DEFAULT_PATTERN }));
    theoretically('case {input}', theories, theory => {
        let cube = solveCube(createCubeWithPattern(theory.input)).cube;
        cube = rotateCubeFromTo(cube, findCubeSideByColor(cube, COLORS.ORANGE), SIDES.FRONT);
        cube = rotateCubeFromTo(cube, findCubeSideByColor(cube, COLORS.YELLOW), SIDES.UP);
        let pattern = cubeToPattern(cube);
        if (pattern != theory.expected) console.log(theory.input);
        expect(pattern).toEqual(theory.expected);
    })
});