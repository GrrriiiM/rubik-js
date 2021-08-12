import { expect, test } from "@jest/globals";
import theoretically from "jest-theories";
import { fixRedundance } from "../src/objs/fixer";
import { MOVEMENTS } from "../src/objs/movements";
import { movementsFromNotation } from "../src/objs/transformer";

describe('Movements Redundance', () => {
    const theories = [
        { input: "U U' B B B' B' D D D D R F' F' F' F' L L' L' L", expected: "R" },
    ]
    theoretically('input {input} expected {expected}', theories, theory => {
        expect(fixRedundance(movementsFromNotation(theory.input))).toEqual(movementsFromNotation(theory.expected));
    })
});
