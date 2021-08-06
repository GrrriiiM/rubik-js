import { scene, sceneEvents } from "../../index.js";

let element;
let movementsCount = 0;
export function init(parentElement) {
    fetch("./components/tools/tools-history.html").then(async (reponse) => {

        element = parentElement.querySelector(".history");
        element.innerHTML = await reponse.text();

        sceneEvents.push(updateHistoryEvent);

    });
}


function updateHistoryEvent() {
    if (movementsCount != scene.movements.length) {
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
            element.appendChild(historyItemHtmlElement);
        }
    }
    movementsCount = scene.movements.length;
}