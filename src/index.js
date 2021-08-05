import { SIDES } from "./objs/constants.js";
import { createCube } from "./objs/creator.js";
import { createScene, refreshScene, rotateScene } from "./objs/interface/scene.js";
import { MOVEMENTS_STR } from "./objs/movements.js";
import { shuffleCube } from "./objs/rotator.js";



let scene = createScene(document, shuffleCube(createCube(3)));
document.querySelector(".cube-area").appendChild(scene.sceneHtmlElement);

let timeHtmlElement = document.querySelector(".time");
let countHtmlElement = document.querySelector(".count");
let historyHtmlElement = document.querySelector(".history");

let movementsCount = 0;
setInterval(() => {
    let time = new Date(Date.now() - scene.createAt.getTime());
    timeHtmlElement.innerHTML = `${time.getUTCHours().toString().padStart(2, "0")}:${time.getUTCMinutes().toString().padStart(2, "0")}:${time.getUTCSeconds().toString().padStart(2, "0")}`;

    if (scene.isCompleted || scene.crossSides.length) {
        document.querySelector(".cube-steps-area>.steps-item.check-cross").classList.add("completed");
    } else {
        document.querySelector(".cube-steps-area>.steps-item.check-cross").classList.remove("completed");
    }

    if (scene.isCompleted || scene.f2lSides.length == 4) {
        document.querySelector(".cube-steps-area>.steps-item.check-f2l").classList.add("completed");
    } else {
        document.querySelector(".cube-steps-area>.steps-item.check-f2l").classList.remove("completed");
    }

    if (scene.isCompleted || scene.ollSide != SIDES.CENTER) {
        document.querySelector(".cube-steps-area>.steps-item.check-oll").classList.add("completed");
    } else {
        document.querySelector(".cube-steps-area>.steps-item.check-oll").classList.remove("completed");
    }

    if (scene.isCompleted) {
        document.querySelector(".cube-steps-area>.steps-item.check-pll").classList.add("completed");
    } else {
        document.querySelector(".cube-steps-area>.steps-item.check-pll").classList.remove("completed");
    }

    if (movementsCount != scene.movements.length) {
        let excludeMoves = ["X", "X'", "Y", "Y'", "Z", "Z'"];
        countHtmlElement.innerHTML = `${scene.movements.filter(_ => excludeMoves.indexOf(_) < 0).length.toString().padStart(5, "0")}`;
        let movements = [];
        if (movementsCount < scene.movements.length) {
            movements = scene.movements.slice(movementsCount);
        } else if (movementsCount > scene.movements.length) {
            movements = scene.movements;
            historyHtmlElement.querySelectorAll(".item").forEach(_ => _.remove());
        }
        for (let movement of movements) {
            let historyItemLabelHtmlElement = document.createElement("div");
            historyItemLabelHtmlElement.classList.add("hint");
            historyItemLabelHtmlElement.innerHTML = movement;
            let historyItemHtmlElement = document.createElement("div");
            historyItemHtmlElement.classList.add("button", "item");
            historyItemHtmlElement.appendChild(historyItemLabelHtmlElement);
            historyHtmlElement.appendChild(historyItemHtmlElement);
        }
    }
    movementsCount = scene.movements.length;
}, 100);

document.querySelectorAll(".button-movement").forEach(_ =>
    _.addEventListener("click", (event) => {
        if (scene.isBusy) return;
        scene.isBusy = true;
        rotateScene(scene, MOVEMENTS_STR[event.currentTarget.id.replace("button-movement-", "")], () => scene.isBusy = false)
    }));


document.querySelector(".button-tool-action-reset").addEventListener("click", () => {
    scene.cube = shuffleCube(createCube(scene.cube.length));
    scene.createAt = new Date(Date.now());
    scene.movements = [];
    refreshScene(scene);
})


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
    hideToolHistory();
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


document.querySelector(".button-tool-history").addEventListener("click", () => toggleToolHistory())
let isToolHistoryExpanded = false;
function toggleToolHistory() {
    if (!isToolHistoryExpanded) showToolHistory();
    else hideToolHistory();
}
function showToolHistory() {
    resetTool();
    isToolHistoryExpanded = true;
    document.querySelector(".tools").classList.add("tools-expanded");
    document.querySelector(".tools").classList.add("tools-history-expanded");
    document.querySelector(".content").classList.add("tools-expanded");
    document.querySelector(".button-tool-history").classList.add("selected");
}
function hideToolHistory() {
    isToolHistoryExpanded = false;
    document.querySelector(".tools").classList.remove("tools-expanded");
    document.querySelector(".tools").classList.remove("tools-history-expanded");
    document.querySelector(".content").classList.remove("tools-expanded");
    document.querySelector(".button-tool-history").classList.remove("selected");
}