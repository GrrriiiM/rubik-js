import { expect } from "@jest/globals";
import theoretically from "jest-theories";
import { COLORS } from "../src/objs/constants";
import { createBlock, createCube } from "../src/objs/creator";

describe("Creator Block", () => {
    const theories = [
        { input: {}, expected: [COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK] },
        { input: { front: COLORS.ORANGE }, expected: [COLORS.BLACK, COLORS.ORANGE, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK] },
        { input: { front: COLORS.ORANGE, up: COLORS.YELLOW }, expected: [COLORS.BLACK, COLORS.ORANGE, COLORS.YELLOW, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK] },
        { input: { front: COLORS.ORANGE, up: COLORS.YELLOW, left: COLORS.GREEN }, expected: [COLORS.BLACK, COLORS.ORANGE, COLORS.YELLOW, COLORS.GREEN, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK] },
        { input: { back: COLORS.BLUE, down: COLORS.RED, right: COLORS.WHITE }, expected: [COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLUE, COLORS.RED, COLORS.WHITE] }
    ];
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(createBlock(theory.input)).toEqual(theory.expected);
    })
});


describe("Creator Cube", () => {
    const theories = [
        {
            input: { size: 3 }, expected: [
                [
                    [
                        [COLORS.BLACK, COLORS.ORANGE, COLORS.YELLOW, COLORS.GREEN, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.ORANGE, COLORS.YELLOW, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.ORANGE, COLORS.YELLOW, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLUE]
                    ],
                    [
                        [COLORS.BLACK, COLORS.ORANGE, COLORS.BLACK, COLORS.GREEN, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.ORANGE, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.ORANGE, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLUE]
                    ],
                    [
                        [COLORS.BLACK, COLORS.ORANGE, COLORS.BLACK, COLORS.GREEN, COLORS.BLACK, COLORS.WHITE, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.ORANGE, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.WHITE, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.ORANGE, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.WHITE, COLORS.BLUE]
                    ],
                ], [
                    [
                        [COLORS.BLACK, COLORS.BLACK, COLORS.YELLOW, COLORS.GREEN, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.BLACK, COLORS.YELLOW, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.BLACK, COLORS.YELLOW, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLUE]
                    ],
                    [
                        [COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.GREEN, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLUE]
                    ],
                    [
                        [COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.GREEN, COLORS.BLACK, COLORS.WHITE, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.WHITE, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.WHITE, COLORS.BLUE]
                    ],
                ], [
                    [
                        [COLORS.BLACK, COLORS.BLACK, COLORS.YELLOW, COLORS.GREEN, COLORS.RED, COLORS.BLACK, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.BLACK, COLORS.YELLOW, COLORS.BLACK, COLORS.RED, COLORS.BLACK, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.BLACK, COLORS.YELLOW, COLORS.BLACK, COLORS.RED, COLORS.BLACK, COLORS.BLUE]
                    ],
                    [
                        [COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.GREEN, COLORS.RED, COLORS.BLACK, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.RED, COLORS.BLACK, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.RED, COLORS.BLACK, COLORS.BLUE]
                    ],
                    [
                        [COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.GREEN, COLORS.RED, COLORS.WHITE, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.RED, COLORS.WHITE, COLORS.BLACK],
                        [COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.RED, COLORS.WHITE, COLORS.BLUE]
                    ]
                ]
            ]
        },
    ];
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(createCube(theory.input.size)).toEqual(theory.expected);
    })
});