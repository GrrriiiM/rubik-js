import { SIDES } from "../../../objs/constants.js";
import { createCube } from "../../../objs/creator.js";
import { shuffleCube } from "../../../objs/rotator.js";

export default function toolsActionComponent(sceneComponent, modalComponent) {
    let element;
    let scene = sceneComponent;
    let modal = modalComponent;
    function render(parentElement) {
        fetch("./components/tools/action/tools-action.component.html").then(async (reponse) => {

            element = parentElement.querySelector(".action");
            element.innerHTML = await reponse.text();

            element.querySelector(".button-tool-action-reset").addEventListener("click", () => scene.reset());

            element.querySelector(".button-tool-action-solve").addEventListener("click", () => scene.solve());

        });
    }

    return {
        element: element,
        render: render
    };
}