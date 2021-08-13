import { describe } from "@jest/globals";
import theoretically from "jest-theories";
import { COLORS, SIDES } from "../src/objs/constants";
import { createCube, createCubeWithPattern, CUBE_DEFAULT_PATTERN } from "../src/objs/creator";
import { findCubeColorBySide, findCubeSideByColor, isCubeCompleted } from "../src/objs/finder";
import { rotateCubeFromTo, shuffleCube } from "../src/objs/rotator";
import { solveCube } from "../src/objs/solver";
import { cubeToPattern } from "../src/objs/transformer";

describe("Solver Cube", () => {

    const theories = [...Array(20).keys()].map(() => cubeToPattern(shuffleCube(createCube(3))));
    // const theories = [
    //     "GOUYORRURYGOYYGWWWRROGGORUWGWURROUYGGWUOWRYUOOYYGUUWWY"
    //     // "RUGOUUYOGRGYUYYYOOWYUWOYYUOORURGOORRUGRRWGGYUWGGWRWWWW",
    //     // "YWWYOWYRWYYWUGGORUROUOWRGGROOUGRWGYRGUOYUWWUYROUGYRGUO",
    //     // "WWYWUUUGUYWOYOOGUGUORGWRYYOWOOYGRGOUWWWGRYRUYRGGRYRRUO",
    //     // "RYGGOUOGOWRRRUOWUOUUGWYRYRWYWRORGUOUUYYYGORUOWWGWWYGGY"
    // ];
    theoretically(_ => `case ${_}`, theories, theory => {
        let cube = solveCube(createCubeWithPattern(theory)).cube;
        // cube = rotateCubeFromTo(cube, findCubeSideByColor(cube, COLORS.ORANGE), SIDES.FRONT);
        // cube = rotateCubeFromTo(cube, findCubeSideByColor(cube, COLORS.YELLOW), SIDES.UP);
        let isCompleted = isCubeCompleted(cube);
        if (!isCompleted) console.log(theory);
        expect(isCompleted).toEqual(true);
    })
});