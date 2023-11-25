import Algorithms from "../classes/Algorithms";
const updateGraphInfo = (graph) => {
    document.querySelector(".graph-components-count").textContent = `Strongly Connected Components ${Algorithms.getSCC(graph).length}`;
    document.querySelector(".graph-order").textContent = `Order ${graph.order()}`;
    document.querySelector(".graph-size").textContent = `Size ${graph.size()}`;
};

const graphInfo = (graph, x, y) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    const container = document.createElement("div");
    const title = document.createElement("p");
    const componentsCount = document.createElement("p");
    const graphOrder = document.createElement("p");
    const graphSize = document.createElement("p");

    title.textContent = "Graph Data";
    componentsCount.textContent = `Strongly Connected Components ${Algorithms.getSCC(graph).length}`;
    graphOrder.textContent = `Order ${graph.order()}`;
    graphSize.textContent = `Size  ${graph.size()}`;

    componentsCount.classList.add("graph-components-count");
    graphOrder.classList.add("graph-order");
    graphSize.classList.add("graph-size");
    title.classList.add("title");
    title.style.fontWeight = "600";

    container.appendChild(title);
    container.appendChild(componentsCount);
    container.appendChild(graphOrder);
    container.appendChild(graphSize);

    container.classList.add("graph-info");

    g.setAttribute("x", "0");
    g.setAttribute("y", "0");
    g.setAttribute("width", "250px");
    g.setAttribute("height", "300px");

    g.appendChild(container);
    return g;
};

export { graphInfo, updateGraphInfo };
