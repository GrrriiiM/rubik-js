export default function modalComponent() {
    let self = {
        element: null,
        show,
        hide
    };
    async function show(title, component) {
        let response = await fetch("./components/modal/modal.component.html");
        self.element = document.createElement("div");
        self.element.classList.add("modal");
        self.element.classList.add(`modal-z-${document.querySelectorAll(".modal").length}`);
        self.element.innerHTML = await response.text();
        self.element.querySelector(".button-close").onclick = hide;
        self.element.querySelector(".modal-title").innerHTML = title;
        self.element.querySelector(".modal-content").classList.add(component.className);
        await component.render(self.element);
        document.querySelector(".wrapper").appendChild(self.element);
        await new Promise(resolve => setTimeout(resolve, 20));
        self.element.classList.add("expanded");
    }
    async function hide() {
        self.element.classList.remove("expanded");
        await new Promise(resolve => setTimeout(resolve, 300));
        self.element.remove();
        self.element = null;
    }
    return self;
}