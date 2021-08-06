import { scene } from "../../index.js";
import { refreshScene } from "../../objs/interface/scene.js";

let element;
export function init(parentElement) {
    fetch("./components/tools/tools-action.html").then(async (reponse) => {

        element = parentElement.querySelector(".action");
        element.innerHTML = await reponse.text();

        element.querySelector(".button-tool-action-reset").addEventListener("click", () => toolActionReset());

    });
}


function toolActionReset() {
    scene.cube = shuffleCube(createCube(scene.cube.length));
    scene.createAt = new Date(Date.now());
    scene.movements = [];
    scene.crossSides = [];
    scene.f2lAt = [];
    scene.ollAt = SIDES.CENTER;
    scene.isCompleted = false;
    scene.crossAt = null;
    scene.f2lAt = null;
    scene.ollAt = null;
    scene.completedAt = null;
    refreshScene(scene);
}