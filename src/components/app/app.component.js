import dragSceneHandler from "../../handlers/drag-scene.handler.js";
import contentComponent from "../content/content.component.js";
import sceneComponent from "../scene/scene.component.js";
import toolsComponent from "../tools/tools.component.js";

export default function appComponent() {
    let element;
    let scene = sceneComponent(dragSceneHandler());
    let tools = toolsComponent(scene);
    tools.onExpanded = hideMenuHelp;
    let content = contentComponent(scene);
    
    function render(parentElement) {
        fetch("./components/app/app.component.html").then(async (reponse) => {
            element = parentElement.querySelector(".app");
            element.innerHTML = await reponse.text();
            tools.render(element);
            content.render(element);
            element.querySelector(".button-help").addEventListener("click", () => toggleMenuHelp())

        });
    }

    function refresh() {
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
        document.querySelector(".content").classList.add("menu-expanded");
        document.querySelector(".button-help").classList.add("selected");
    }

    function hideMenuHelp() {
        isMenuExpanded = false;
        document.querySelector(".content").classList.remove("menu-expanded");
        document.querySelector(".button-help").classList.remove("selected");
    }

    return {
        element,
        render,
        refresh
    }
}