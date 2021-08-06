import { scene, sceneEvents } from "../../index.js";
import { SIDES } from "../../objs/constants.js";

let element;
let timeHtmlElement;
let countHtmlElement;
let checkCrossElement;
let checkF2LElement;
let checkOLLElement;
let checkPLLElement;
let timeCrossElement;
let timeF2LElement;
let timeOLLElement;
let timePLLElement;
let movementsCount;
export function init(parentElement) {
    
    fetch("./components/content/content.html").then(async (reponse) => {

        element = parentElement.querySelector(".content");
        element.innerHTML = await reponse.text();

        timeHtmlElement = document.querySelector(".time");
        countHtmlElement = document.querySelector(".count");
        checkCrossElement = element.querySelector(".cube-steps-area>.steps-item.check-cross");
        checkF2LElement = element.querySelector(".cube-steps-area>.steps-item.check-f2l");
        checkOLLElement = element.querySelector(".cube-steps-area>.steps-item.check-oll");
        checkPLLElement = element.querySelector(".cube-steps-area>.steps-item.check-pll");
        timeCrossElement = element.querySelector(".cube-steps-area>.steps-time.time-cross");
        timeF2LElement = element.querySelector(".cube-steps-area>.steps-time.time-f2l");
        timeOLLElement = element.querySelector(".cube-steps-area>.steps-time.time-oll");
        timePLLElement = element.querySelector(".cube-steps-area>.steps-time.time-pll");

        element.querySelector(".cube-area").appendChild(scene.sceneHtmlElement);


        sceneEvents.push(update);
    });
}

function update() {
    let time = new Date(Date.now() - scene.createAt.getTime());
    timeHtmlElement.innerHTML = `${time.getUTCHours().toString().padStart(2, "0")}:${time.getUTCMinutes().toString().padStart(2, "0")}:${time.getUTCSeconds().toString().padStart(2, "0")}`;

    if (scene.isCompleted || scene.crossSides.length) {
        checkCrossElement.classList.add("completed");
    } else {
        checkCrossElement.classList.remove("completed");
    }

    if (scene.isCompleted || scene.f2lSides.length == 4) {
        checkF2LElement.classList.add("completed");
    } else {
        checkF2LElement.classList.remove("completed");
    }

    if (scene.isCompleted || scene.ollSide != SIDES.CENTER) {
        checkOLLElement.classList.add("completed");
    } else {
        checkOLLElement.classList.remove("completed");
    }

    if (scene.isCompleted) {
        checkPLLElement.classList.add("completed");
    } else {
        checkPLLElement.classList.remove("completed");
    }

    if (scene.crossAt) {
        let at = new Date(scene.crossAt.getTime() - scene.createAt.getTime());
        timeCrossElement.innerHTML = `${at.getUTCHours().toString().padStart(2, "0")}:${at.getUTCMinutes().toString().padStart(2, "0")}:${at.getUTCSeconds().toString().padStart(2, "0")}`
    } else {
        timeCrossElement.innerHTML = "";
    }
    if (scene.f2lAt) {
        let at = new Date(scene.f2lAt.getTime() - scene.createAt.getTime());
        timeF2LElement.innerHTML = `${at.getUTCHours().toString().padStart(2, "0")}:${at.getUTCMinutes().toString().padStart(2, "0")}:${at.getUTCSeconds().toString().padStart(2, "0")}`
    } else {
        timeF2LElement.innerHTML = "";
    }
    if (scene.ollAt) {
        let at = new Date(scene.ollAt.getTime() - scene.createAt.getTime());
        timeOLLElement.innerHTML = `${at.getUTCHours().toString().padStart(2, "0")}:${at.getUTCMinutes().toString().padStart(2, "0")}:${at.getUTCSeconds().toString().padStart(2, "0")}`
    } else {
        timeOLLElement.innerHTML = "";
    }
    if (scene.completedAt) {
        let at = new Date(scene.completedAt.getTime() - scene.createAt.getTime());
        timePLLElement.innerHTML = `${at.getUTCHours().toString().padStart(2, "0")}:${at.getUTCMinutes().toString().padStart(2, "0")}:${at.getUTCSeconds().toString().padStart(2, "0")}`
    } else {
        timePLLElement.innerHTML = "";
    }

    if (movementsCount != scene.movements.length) {
        let excludeMoves = ["X", "X'", "Y", "Y'", "Z", "Z'"];
        countHtmlElement.innerHTML = `${scene.movements.filter(_ => excludeMoves.indexOf(_) < 0).length.toString().padStart(5, "0")}`;
    }
    
    movementsCount = scene.movements.length;

}