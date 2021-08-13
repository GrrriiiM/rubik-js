export default function modalComponent() {
    let element;
    let titleElement;
    let contentElement;
    let buttonCloseElement;
    function show(id, title, content) {
        fetch("./components/modal/modal.component.html").then(async (reponse) => {
            element = document.createElement("div");
            element.classList.add("modal", id);
            document.querySelector(".wrapper").appendChild(element);
            element.innerHTML = await reponse.text();
            titleElement = element.querySelector(".modal-title");
            contentElement = element.querySelector(".modal-content");
            let c = content.cloneNode(true);
            c.classList.remove("template");
            contentElement.appendChild(c);
            buttonCloseElement = element.querySelector(".button-close");
            buttonCloseElement.onclick = hide;
            titleElement.innerHTML = title;
            setTimeout(() => {
                element.classList.add("expanded");    
            }, 20);
            
        });
    }
    function hide() {
        element.classList.remove("expanded");
        setTimeout(() => {
            element.remove();
        }, 300);
    }
    return {
        element,
        show,
        hide
    }
}