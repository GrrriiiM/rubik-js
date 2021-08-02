import { AXIS, SIDES } from "./constants";
import { Side } from "../side";

export class Block {

    #sides;

    constructor(sides) {
        this.#sides = sides;
    }

    get sides() { return this.#sides; }
    
    static create(size) {
        let blocks = [];
        let range = [...Array(this._size).keys()];
        for (let z in range) {
            let sideZ = SIDES.fromAxis(AXIS.Z, z, size);
            let zs = [];
            for (let y in range) {
                let sideY = SIDES.fromAxis(AXIS.Y, y, size);
                let ys = [];
                for (let x in range) {
                    let sideX = SIDES.fromAxis(AXIS.X, x, size);
                    let colors = Object.keys(SIDES).map(_ => COLORS.fromSide(SIDES.CENTER));
                    colors[sideZ] = COLOR.fromSide(sideZ);
                    colors[sideY] = COLOR.fromSide(sideY);
                    colors[sideX] = COLOR.fromSide(sideX);
                    ys.push(new Block(colors.map(new Side(color))));
                }
                zs.push(ys);
            }
            blocks.push(zs);
        }
        return blocks;
    }
}
