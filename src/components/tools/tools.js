import { hideMenuHelp } from "../../index.js";
import { init as actionInit } from "./tools-action.js";
import { init as historyInit } from "./tools-history.js";
import { init as movementInit } from "./tools-movement.js";


let element;
let buttonMovementElement;
let buttonHistoryElement;
let buttonAlgoElement;
let buttonActionElement;

export function init(parentElement) {
    
    fetch("./components/tools/tools.html").then(async (reponse) => {

        element = parentElement.querySelector(".tools");
        element.innerHTML = await reponse.text();

        buttonHistoryElement = element.querySelector(".button-tool-history");
        buttonMovementElement = element.querySelector(".button-tool-movement");
        buttonActionElement = element.querySelector(".button-tool-action");
        
        buttonHistoryElement.addEventListener("click", () => toggleToolHistory())
        buttonMovementElement.addEventListener("click", () => toggleToolMovement())
        buttonActionElement.addEventListener("click", () => toggleToolAction())

        actionInit(element);
        historyInit(element);
        movementInit(element);
        
    });
}




function resetTool() {
    hideMenuHelp();
    hideTool();
}

export function hideTool() {
    hideToolAction();
    hideToolMovement();
    hideToolHistory();
}

let isToolActionExpanded = false;
function toggleToolAction() {
    if (!isToolActionExpanded) showToolAction();
    else hideToolAction();
}

function showToolAction() {
    resetTool();
    isToolActionExpanded = true;
    element.classList.add("tools-expanded");
    element.classList.add("tools-action-expanded");
    document.querySelector(".content").classList.add("tools-expanded");
    document.querySelector(".button-tool-action").classList.add("selected");
}
function hideToolAction() {
    isToolActionExpanded = false;
    element.classList.remove("tools-expanded");
    element.classList.remove("tools-action-expanded");
    document.querySelector(".content").classList.remove("tools-expanded");
    document.querySelector(".button-tool-action").classList.remove("selected");
}




let isToolMovementExpanded = false;
function toggleToolMovement() {
    if (!isToolMovementExpanded) showToolMovement();
    else hideToolMovement();
}
function showToolMovement() {
    resetTool();
    isToolMovementExpanded = true;
    element.classList.add("tools-expanded");
    element.classList.add("tools-movement-expanded");
    element.classList.add("tools-expanded");
    document.querySelector(".button-tool-movement").classList.add("selected");
}
function hideToolMovement() {
    isToolMovementExpanded = false;
    element.classList.remove("tools-expanded");
    element.classList.remove("tools-movement-expanded");
    document.querySelector(".content").classList.remove("tools-expanded");
    document.querySelector(".button-tool-movement").classList.remove("selected");
}



let isToolHistoryExpanded = false;
function toggleToolHistory() {
    if (!isToolHistoryExpanded) showToolHistory();
    else hideToolHistory();
}
function showToolHistory() {
    resetTool();
    isToolHistoryExpanded = true;
    element.classList.add("tools-expanded");
    element.classList.add("tools-history-expanded");
    document.querySelector(".content").classList.add("tools-expanded");
    document.querySelector(".button-tool-history").classList.add("selected");
}
function hideToolHistory() {
    isToolHistoryExpanded = false;
    element.classList.remove("tools-expanded");
    element.classList.remove("tools-history-expanded");
    document.querySelector(".content").classList.remove("tools-expanded");
    document.querySelector(".button-tool-history").classList.remove("selected");
}





