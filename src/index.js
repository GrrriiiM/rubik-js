import { createCube } from "./objs/creator.js";
import { createScene, rotateScene } from "./objs/interface/scene.js";
import { movementFromString } from "./objs/transformer.js";


let scene = createScene(document, createCube(3));
document.querySelector(".cube-area").appendChild(scene.sceneHtmlElement);

let isBusy = false
let buttons = document.querySelectorAll(".button-area>.button-rotate");
buttons.forEach(_ => _.addEventListener("click", (event) => {
    if (isBusy) return;
    isBusy = true;
    rotateScene(scene, movementFromString(event.target.value), () => isBusy = false)
}));

