import dragSceneHandler from "../../handlers/drag-scene.handler.js";
import { createCubeEmpty, createCubeWithPattern } from "../../objs/creator.js";
import { cubeToPattern } from "../../objs/transformer.js";
import contentComponent from "../content/content.component.js";
import modalComponent from "../modal/modal.component.js";
import { newCubeComponent } from "../new-cube/new-cube.component.js";
import { scanComponent } from "../scan/scan.component.js";
import sceneComponent from "../scene/scene.component.js";
import toolsComponent from "../tools/tools.component.js";

export default function appComponent() {
    let element;
    let cube;
    let time = 0;
    let movementCount = 0;
    let modal = modalComponent();
    let autoSave = localStorage.getItem("auto-save");
    
    let scene = sceneComponent(dragSceneHandler(), { cube, time, movementCount });
    scene.onRotated = onRotated;
    let tools = toolsComponent(scene);
    tools.onExpanded = hideMenuHelp;
    let content = contentComponent(scene);
    

    async function render(parentElement) {
        let response = await fetch("./components/app/app.component.html")
        element = parentElement.querySelector(".app");
        element.innerHTML = await response.text();
        await tools.render(element);
        await content.render(element);
        element.querySelector(".button-help").addEventListener("click", () => toggleMenuHelp())
        // element.querySelector(".button-scan").addEventListener("click", () => {
        //     let scan = scanComponent();
        //     scan.onFinished = (pattern) => {
        //         modal.hide();
        //         scene.setCube(createCubeWithPattern(pattern));
        //     }
        //     modal.show("Escanear Cubo (beta)", scan);
        // });
        
        if (autoSave && autoSave.split(":")[0] != cubeToPattern(createCubeEmpty(3))) {
            try {
                cube = createCubeWithPattern(autoSave.split(":")[0], 3);
                time = parseInt(autoSave.split(":")[1]);
                movementCount = parseInt(autoSave.split(":")[2]);
                scene.setCube(cube, time, movementCount);
            } finally {}
        } else {
            modal.show("Criar Cubo", newCubeComponent(pattern => {
                scene.setCube(createCubeWithPattern(pattern, 3));
                modal.hide();
            }));
        }
        refresh();
    }

    function onRotated(state) {
        let time = new Date(Date.now() - state.createAt.getTime());
        localStorage.setItem("auto-save", `${cubeToPattern(state.cube)}:${time.getTime()}:${state.movementCount}`);
        refresh();
    }

    async function refresh() {
        tools.refresh && tools.refresh();
        content.refresh && content.refresh();
    }

    let isMenuExpanded = false;
    function toggleMenuHelp() {
        if (!isMenuExpanded) showMenuHelp();
        else hideMenuHelp();
    }
    function showMenuHelp() {
        tools.hide();
        isMenuExpanded = true;
        content.element.classList.add("menu-expanded");
        document.querySelector(".button-help").classList.add("selected");
    }

    function hideMenuHelp() {
        isMenuExpanded = false;
        content.element.classList.remove("menu-expanded");
        document.querySelector(".button-help").classList.remove("selected");
    }

    return {
        element,
        render,
        refresh
    }
}