import { createCube } from "./objs/creator.js";
import { render } from "./objs/renderer.js";

let cube = createCube(3);
render(cube, document, "cube-area");