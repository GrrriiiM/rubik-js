import { scene } from "../../index.js";
import { rotateScene } from "../../objs/interface/scene.js";
import { MOVEMENTS_STR } from "../../objs/movements.js";


let element;
export function init(parentElement) {
    fetch("./components/tools/tools-movement.html").then(async (reponse) => {

        element = parentElement.querySelector(".movement");
        element.innerHTML = await reponse.text();
        
        document.querySelectorAll(".button-movement").forEach(_ => 
            _.addEventListener("click", (event) => {
                executeMovement(event.currentTarget.id.replace("button-movement-", ""));
            }));
    });
}

function executeMovement(movementStr) {
    if (scene.isBusy) return;
    scene.isBusy = true;
    rotateScene(scene, MOVEMENTS_STR[movementStr], () => scene.isBusy = false)
}