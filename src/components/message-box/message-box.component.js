export function messageBoxComponent() {
    let self = {
        className: "message-box",
        element: null,
        show,
    }
    async function show(title, message, icon="", iconColor="white", time=3000) {
        let response = await fetch("./components/message-box/message-box.component.html");
        self.element = document.createElement("div");
        self.element.classList.add(self.className);
        // self.element.classList.add(`modal-z-${document.querySelectorAll(".modal").length}`);
        self.element.innerHTML = await response.text();
        self.element.querySelector(".message-box-title").innerHTML = title;
        self.element.querySelector(".message-box-text").innerHTML = message;

        if (icon) {
            self.element.querySelector(".message-box-icon").innerHTML = icon;
            if (iconColor) {
                self.element.querySelector(".message-box-icon").style.color = iconColor;
            }
        }

        document.querySelector(".wrapper").appendChild(self.element);
        await new Promise(resolve => setTimeout(resolve, 20));
        self.element.classList.add("expanded");

        

        setTimeout(async () => {
            await hide();
        }, time);
    }

    async function hide() {
        self.element.classList.remove("expanded");
        await new Promise(resolve => setTimeout(resolve, 300));
        self.element.remove();
        self.element = null;
    }

    return self;
}