import { getSvgSize } from "./Ui";

const nodeComponent = (node, x, y, r = 25, onNameChange, onClick) => {
    const container = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const foreignObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    const nameInput = document.createElement("input");

    const { w, h } = getSvgSize();

    container.setAttribute("x", x);
    container.setAttribute("y", y);
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", r);

    foreignObj.setAttribute("x", `${parseFloat(x) - ((r / 2) * 100) / w}%`);
    foreignObj.setAttribute("y", `${parseFloat(y) - ((r / 2) * 100) / h}%`);
    foreignObj.setAttribute("width", (r * 100) / w + "%");
    foreignObj.setAttribute("height", (r * 100) / h + "%");

    container.setAttribute("name", node.name);
    nameInput.type = "text";
    nameInput.value = node.name;

    container.classList.add("node");
    nameInput.classList.add("node-name-input");

    nameInput.oninput = () => {
        onNameChange(node, nameInput.value);
        nameInput.value = node.name;
        container.setAttribute("name", node.name);
    };

    container.onmousedown = (e) => {
        onClick(e);
    };

    foreignObj.appendChild(nameInput);
    container.appendChild(circle);
    container.appendChild(foreignObj);

    return container;
};

export default nodeComponent;
