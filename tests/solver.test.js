import { expect, test } from "@jest/globals";
import { SIDES } from "../src/objs/constants";
import { createCube } from "../src/objs/creator";
import { findCubeColorBySide } from "../src/objs/finder";
import { shuffleCube } from "../src/objs/rotator";
import { solveCubeCross } from "../src/objs/solver";

describe('Cross', () => {
    const cube = shuffleCube(createCube(3));

    test('front', () => {
        let frontColor = findCubeColorBySide(cube, SIDES.FRONT);
        let upColor = findCubeColorBySide(cube, SIDES.UP);
        let rightColor = findCubeColorBySide(cube, SIDES.RIGHT);
        let downColor = findCubeColorBySide(cube, SIDES.DOWN);
        let leftColor = findCubeColorBySide(cube, SIDES.LEFT);
        let history = [];
        let cubeResolved = solveCubeCross(cube, SIDES.FRONT, history);
        expect(cubeResolved[0][1][1][SIDES.FRONT]).toBe(frontColor);
        expect(cubeResolved[0][0][1][SIDES.FRONT]).toBe(frontColor);
        expect(cubeResolved[0][0][1][SIDES.UP]).toBe(upColor);
        
        expect(cubeResolved[0][1][0][SIDES.FRONT]).toBe(frontColor);
        expect(cubeResolved[0][1][0][SIDES.LEFT]).toBe(leftColor);

        expect(cubeResolved[0][1][2][SIDES.FRONT]).toBe(frontColor);
        expect(cubeResolved[0][1][2][SIDES.RIGHT]).toBe(rightColor);

        expect(cubeResolved[0][2][1][SIDES.FRONT]).toBe(frontColor);
        expect(cubeResolved[0][2][1][SIDES.DOWN]).toBe(downColor);
        
    })
});