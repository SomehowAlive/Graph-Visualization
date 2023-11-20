import { NodeRadius } from "./Ui";

const createSelfEdge = (x, y, radius) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    const controlX1 = x + radius * 4;
    const controlY1 = y - radius * 2;
    const controlX2 = x + radius * 2;
    const controlY2 = y - radius * 4;

    path.setAttribute("d", `M ${x + radius} ${y} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x} ${y - radius}`);

    return path;
};

const edgeComponent = (edge, x1, x2, y1, y2, onWeightChange, onClick) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    let line;
    // case of self edge
    if (x1 === x2 && y1 === y2) {
        line = createSelfEdge(x1, y1, NodeRadius);
        g.classList.add("self-edge");
    } else {
        line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    }
    const inputContainer = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    const weightInput = document.createElement("input");

    g.classList.add("edge");
    line.classList.add("edge-line");
    weightInput.classList.add("edge-weight-input");

    const startAdjustX = (NodeRadius * (x2 - x1)) / Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const startAdjustY = (NodeRadius * (y2 - y1)) / Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const endAdjustX = (NodeRadius * (x1 - x2)) / Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const endAdjustY = (NodeRadius * (y1 - y2)) / Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    line.setAttribute("x1", x1 + startAdjustX);
    line.setAttribute("x2", x2 + endAdjustX);
    line.setAttribute("y1", y1 + startAdjustY);
    line.setAttribute("y2", y2 + endAdjustY);

    let inputContainerX = (x1 + x2) / 2;
    let inputContainerY = (y1 + y2) / 2;

    // Check if input containers overlap and adjust position
    if (x1 > x2) {
        inputContainerX -= 30;
    } else {
        inputContainerX += 30;
    }

    inputContainer.setAttribute("x", inputContainerX);
    inputContainer.setAttribute("y", inputContainerY);
    inputContainer.setAttribute("width", 40);
    inputContainer.setAttribute("height", 40);

    g.setAttribute("start-node", edge.startNode.name);
    g.setAttribute("end-node", edge.endNode.name);

    weightInput.type = "number";
    weightInput.value = edge.weight;

    weightInput.oninput = (e) => onWeightChange(e, g);

    g.onclick = onClick;

    inputContainer.appendChild(weightInput);
    g.appendChild(line);
    g.appendChild(inputContainer);

    return g;
};

export default edgeComponent;
