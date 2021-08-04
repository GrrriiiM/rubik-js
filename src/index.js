import { createCube } from "./objs/creator.js";
import { createScene, rotateScene } from "./objs/interface/scene.js";
import { movementFromString } from "./objs/transformer.js";


let scene = createScene(document, createCube(3));
document.querySelector(".cube-area").appendChild(scene.sceneHtmlElement);

let isBusy = false
document.querySelectorAll(".button-movement").forEach(_ =>
    _.addEventListener("click", (event) => {
        if (isBusy) return;
        isBusy = true;
        rotateScene(scene, movementFromString(event.currentTarget.id.replace("button-movement-","")), () => isBusy = false)
    }));


document.querySelector(".button-help").addEventListener("click", () => toggleMenuHelp())
let isMenuExpanded = false;
function toggleMenuHelp() {
    if (!isMenuExpanded) showMenuHelp();
    else hideMenuHelp();
}
function showMenuHelp() {
    hideToolAction();
    isMenuExpanded = true;
    document.querySelector(".content").classList.add("menu-expanded");
    document.querySelector(".button-help").classList.add("selected");
}
function hideMenuHelp() {
    isMenuExpanded = false;
    document.querySelector(".content").classList.remove("menu-expanded");
    document.querySelector(".button-help").classList.remove("selected");
}

function resetTool() {
    hideMenuHelp();
    hideToolAction();
    hideToolMovement();
}


document.querySelector(".button-tool-action").addEventListener("click", () => toggleToolAction())
let isToolActionExpanded = false;
function toggleToolAction() {
    if (!isToolActionExpanded) showToolAction();
    else hideToolAction();
}
function showToolAction() {
    resetTool();
    isToolActionExpanded = true;
    document.querySelector(".tools").classList.add("tools-expanded");
    document.querySelector(".tools").classList.add("tools-action-expanded");
    document.querySelector(".content").classList.add("tools-expanded");
    document.querySelector(".button-tool-action").classList.add("selected");
}
function hideToolAction() {
    isToolActionExpanded = false;
    document.querySelector(".tools").classList.remove("tools-expanded");
    document.querySelector(".tools").classList.remove("tools-action-expanded");
    document.querySelector(".content").classList.remove("tools-expanded");
    document.querySelector(".button-tool-action").classList.remove("selected");
}



document.querySelector(".button-tool-movement").addEventListener("click", () => toggleToolMovement())
let isToolMovementExpanded = false;
function toggleToolMovement() {
    if (!isToolMovementExpanded) showToolMovement();
    else hideToolMovement();
}
function showToolMovement() {
    resetTool();
    isToolMovementExpanded = true;
    document.querySelector(".tools").classList.add("tools-expanded");
    document.querySelector(".tools").classList.add("tools-movement-expanded");
    document.querySelector(".content").classList.add("tools-expanded");
    document.querySelector(".button-tool-movement").classList.add("selected");
}
function hideToolMovement() {
    isToolMovementExpanded = false;
    document.querySelector(".tools").classList.remove("tools-expanded");
    document.querySelector(".tools").classList.remove("tools-movement-expanded");
    document.querySelector(".content").classList.remove("tools-expanded");
    document.querySelector(".button-tool-movement").classList.remove("selected");
}