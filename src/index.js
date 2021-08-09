import appComponent from "./components/app/app.component.js";

let app = appComponent();
app.render(document.querySelector(".wrapper"));

setInterval(() => {
    app.refresh()
}, 250);