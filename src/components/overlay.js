import DoubleLeftClick from "../assets/Double Left Click.svg";
import LeftClick from "../assets/Left Click.svg";
import MiddleClick from "../assets/Middle Click.svg";
import Del from "../assets/Del.svg";

const overlay = (overlayElem) => {
    const overlayContainer = document.createElement("div");
    const closeOverlayBtn = document.createElement("button");
    overlayContainer.classList.add("overlay");

    closeOverlayBtn.innerText = "x";

    closeOverlayBtn.classList.add("close-overlay-btn");
    overlayContainer.appendChild(overlayElem);
    overlayContainer.appendChild(closeOverlayBtn);

    closeOverlayBtn.onclick = () => document.querySelector(".overlay").classList.remove("show");

    return overlayContainer;
};

const showOverlay = () => document.querySelector(".overlay").classList.add("show");

const help = (...rows) => {
    const cont = document.createElement("div");
    const title = document.createElement("p");
    cont.classList.add("help");
    title.classList.add("title");
    title.innerText = "User Guide";
    cont.appendChild(title);
    for (const row of rows) {
        cont.appendChild(row);
    }
    return cont;
};

const helpRow = (imgSrc, text) => {
    const rowCont = document.createElement("div");
    const p = document.createElement("p");
    const img = new Image();

    rowCont.classList.add("help-row");
    img.src = imgSrc;
    img.classList.add("icon");
    p.innerText = text;

    rowCont.appendChild(img);
    rowCont.appendChild(p);

    return rowCont;
};

const HelpOverlay = () =>
    overlay(
        help(
            helpRow(DoubleLeftClick, "Double Left Click to Add a new node"),
            helpRow(LeftClick, "Left Click to Select a node or an edge"),
            helpRow(MiddleClick, "Middle Click to add a self edge to a node"),
            helpRow(Del, "Select a node/edge and press the del key to delete it")
        )
    );

const openOverlayBtn = () => {
    const btn = document.createElement("button");
    btn.classList.add("open-overlay-btn", "btn");
    btn.onclick = () => document.querySelector(".overlay").classList.toggle("show");
    btn.innerText = "?";

    return btn;
};
export { showOverlay, HelpOverlay, openOverlayBtn };
