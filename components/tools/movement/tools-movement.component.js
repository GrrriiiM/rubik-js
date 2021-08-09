import { MOVEMENTS_STR } from "../../../objs/movements.js";

export default function toolsMovementComponent(sceneComponent) {
    let scene = sceneComponent;
    let element;
    function render(parentElement) {
        fetch("./components/tools/movement/tools-movement.component.html").then(async (reponse) => {

            element = parentElement.querySelector(".movement");
            element.innerHTML = await reponse.text();

            element.querySelectorAll(".button-movement").forEach(_ =>
                _.addEventListener("click", (event) => {
                    executeMovement(event.currentTarget.id.replace("button-movement-", ""));
                }));
        });
    }

    function executeMovement(movementStr) {
        scene.rotate(MOVEMENTS_STR[movementStr])
    }

    return {
        element: element,
        render: render
    }
}