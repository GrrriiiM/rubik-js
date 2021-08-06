import { init as contentInit } from "./components/content/content.js";
import { hideTool, init as toolInit } from "./components/tools/tools.js";
import { SIDES } from "./objs/constants.js";
import { createCube } from "./objs/creator.js";
import { createScene } from "./objs/interface/scene.js";
import { shuffleCube } from "./objs/rotator.js";


export const scene = createScene(document, shuffleCube(createCube(3)));
export const sceneEvents = [];

let element = document.querySelector(".app");
contentInit(element);
toolInit(element);







setInterval(() => {
    
    sceneEvents.forEach(_ => _());
}, 100);




document.querySelector(".button-help").addEventListener("click", () => toggleMenuHelp())
let isMenuExpanded = false;
function toggleMenuHelp() {
    if (!isMenuExpanded) showMenuHelp();
    else hideMenuHelp();
}
function showMenuHelp() {
    hideTool();
    isMenuExpanded = true;
    document.querySelector(".content").classList.add("menu-expanded");
    document.querySelector(".button-help").classList.add("selected");
}

export function hideMenuHelp() {
    isMenuExpanded = false;
    document.querySelector(".content").classList.remove("menu-expanded");
    document.querySelector(".button-help").classList.remove("selected");
}




