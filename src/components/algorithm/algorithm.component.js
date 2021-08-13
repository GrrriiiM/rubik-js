import dragSceneHandler from "../../handlers/drag-scene.handler.js";
import { invertClockMovement } from "../../objs/transformer.js";
import sceneComponent from "../scene/scene.component.js";

export function algorithmComponent(cube, name, movements, headers) {
    let state = {
        cube,
        name,
        movements,
        headers,
        movementPosition: 0
    }
    let dragHandler = dragSceneHandler();
    let scene = sceneComponent(dragHandler, cube);
    let self = {
        className: "algorithm",
        element: null,
        state,
        render
    };
    let movementsAreaElement;
    let isPlay = false;
    async function render(parentElement) {
        let response = await fetch("./components/algorithm/algorithm.component.html");
        self.element = parentElement.querySelector(`.${self.className}`);
        self.element.innerHTML = await response.text();
        scene.render(self.element);

        movementsAreaElement = self.element.querySelector(".movements-area");

        self.element.querySelector(".button-next").onclick = nextMovement;
        self.element.querySelector(".button-prev").onclick = previousMovement;
        self.element.querySelector(".button-play").onclick = playMovement;
        



        for (let movement of state.movements) {
            let buttonMovementElement = self.element.querySelector(".button-movement.template").cloneNode(true);
            buttonMovementElement.classList.remove("template");
            buttonMovementElement.innerHTML = movement.str;
            movementsAreaElement.appendChild(buttonMovementElement);
        }

        await updateMovementsArea();
    }

    async function playMovement() {
        if (scene.state.isBusy) return;
        isPlay = !isPlay
        while (isPlay) {
            if (state.movementPosition >= state.movements.length) break;
            await nextMovement();
            await new Promise(resolve => setTimeout(resolve, 250));
        }
        isPlay = false;
    }

    async function nextMovement() {
        if (scene.state.isBusy) return;
        if (state.movementPosition < state.movements.length) {
            state.movementPosition += 1;
            await updateMovementsArea();
            await scene.rotate(state.movements[state.movementPosition - 1]);
        }
    }

    async function previousMovement() {
        if (scene.state.isBusy) return;
        if (state.movementPosition > 0) {
            state.movementPosition -= 1;
            await updateMovementsArea();
            await scene.rotate(invertClockMovement(state.movements[state.movementPosition]));
        }
    }

    async function updateMovementsArea() {
        if (state.movementPosition) movementsAreaElement.style.marginLeft = `calc((((var(--movement-button-small) + 10px)) * -${state.movementPosition}) - 15px)`;
        else movementsAreaElement.style.marginLeft = "-5px";
        movementsAreaElement.querySelectorAll(".button-movement").forEach((el, i) => {
            if (i == state.movementPosition) {
                el.classList.add("big")
                el.classList.remove("mid")
            } else if (i - 1 == state.movementPosition || i + 1 == state.movementPosition) {
                el.classList.add("mid")
                el.classList.remove("big")
            } else {
                el.classList.remove("mid")
                el.classList.remove("big")
            }
        });
    }

    return self;
}