import { expect, test } from "@jest/globals";
import { AXIS, COLORS, SIDES } from "../src/objs/constants";


test("SIDES fromAxis success", () => {
    expect(SIDES.fromAxis(AXIS.Z)).toBe(SIDES.FRONT);
    expect(SIDES.fromAxis(AXIS.Y)).toBe(SIDES.UP);
    expect(SIDES.fromAxis(AXIS.X)).toBe(SIDES.LEFT);

    expect(SIDES.fromAxis(AXIS.Z, { size: 3 })).toBe(SIDES.FRONT);
    expect(SIDES.fromAxis(AXIS.Y, { size: 3 })).toBe(SIDES.UP);
    expect(SIDES.fromAxis(AXIS.X, { size: 3 })).toBe(SIDES.LEFT);

    expect(SIDES.fromAxis(AXIS.Z, { size: 3, layer: 1 })).toBe(SIDES.CENTER);
    expect(SIDES.fromAxis(AXIS.Y, { size: 3, layer: 1 })).toBe(SIDES.CENTER);
    expect(SIDES.fromAxis(AXIS.X, { size: 3, layer: 1 })).toBe(SIDES.CENTER);

    expect(SIDES.fromAxis(AXIS.Z, { size: 3, layer: 2 })).toBe(SIDES.BACK);
    expect(SIDES.fromAxis(AXIS.Y, { size: 3, layer: 2 })).toBe(SIDES.DOWN);
    expect(SIDES.fromAxis(AXIS.X, { size: 3, layer: 2 })).toBe(SIDES.RIGHT);
});


test("COLORS fromSides success", () => {
    expect(COLORS.fromSide(SIDES.FRONT)).toBe(COLORS.ORANGE);
    expect(COLORS.fromSide(SIDES.UP)).toBe(COLORS.YELLOW);
    expect(COLORS.fromSide(SIDES.LEFT)).toBe(COLORS.GREEN);
    expect(COLORS.fromSide(SIDES.BACK)).toBe(COLORS.RED);
    expect(COLORS.fromSide(SIDES.DOWN)).toBe(COLORS.WHITE);
    expect(COLORS.fromSide(SIDES.RIGHT)).toBe(COLORS.BLUE);
});