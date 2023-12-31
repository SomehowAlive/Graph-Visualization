import { NodeRadius, getSvgSize } from "./Ui";

const createSelfEdge = (x, y, radius) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    const { w, h } = getSvgSize();
    const actualX = (parseFloat(x) * w) / 100;
    const actualY = (parseFloat(y) * h) / 100;

    const controlX1 = ((actualX + radius * 2) / w) * 100;
    const controlY1 = ((actualY - radius * 2) / h) * 100;
    const controlX2 = ((actualX - radius * 2) / w) * 100;
    const controlY2 = ((actualY - radius * 2) / h) * 100;

    path.setAttribute(
        "d",
        `M ${actualX} ${actualY} 
    C ${controlX1}% ${controlY1}%, ${controlX2}% ${controlY2}%, ${actualX} ${actualY - radius}`
    );

    return path;
};

const edgeComponent = (edge, x1, x2, y1, y2, onWeightChange, onClick) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    let line;
    const inputContainer = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    const weightInput = document.createElement("input");
    g.classList.add("edge");
    weightInput.classList.add("edge-weight-input");

    const { w, h } = getSvgSize();

    if (x1 === x2 && y1 === y2) {
        line = createSelfEdge(x1, y1, NodeRadius);
        g.classList.add("self-edge");
    } else {
        line = document.createElementNS("http://www.w3.org/2000/svg", "line");

        const startAdjustX = (((NodeRadius * 100) / w) * (x2 - x1)) / Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const startAdjustY = (((NodeRadius * 100) / h) * (y2 - y1)) / Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const endAdjustX = (((NodeRadius * 100) / w) * (x1 - x2)) / Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const endAdjustY = (((NodeRadius * 100) / h) * (y1 - y2)) / Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

        line.setAttribute("x1", parseFloat(x1) + startAdjustX + "%");
        line.setAttribute("x2", parseFloat(x2) + endAdjustX + "%");
        line.setAttribute("y1", parseFloat(y1) + startAdjustY + "%");
        line.setAttribute("y2", parseFloat(y2) + endAdjustY + "%");
    }

    line.classList.add("edge-line");

    let inputContainerX = (x1 + x2) / 2;
    let inputContainerY = (y1 + y2) / 2;

    // Check if input containers overlap and adjust position
    if (x1 > x2) {
        inputContainerX -= 30 / w;
    } else {
        inputContainerX += 30 / w;
    }

    inputContainer.setAttribute("x", inputContainerX + "%");
    inputContainer.setAttribute("y", inputContainerY + "%");
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
