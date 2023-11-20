const updateGraphInfo = (graph) => {
    document.querySelector(".graph-order").textContent = `Order ${graph.order()}`;
    document.querySelector(".graph-size").textContent = `Size ${graph.size()}`;
};

const graphInfo = (graph, x, y) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    const container = document.createElement("div");
    const graphOrder = document.createElement("p");
    const graphSize = document.createElement("p");

    graphOrder.textContent = `Order ${graph.order()}`;
    graphSize.textContent = `Size  ${graph.size()}`;

    graphOrder.classList.add("graph-order");
    graphSize.classList.add("graph-size");

    container.appendChild(graphOrder);
    container.appendChild(graphSize);

    container.classList.add("graph-info");

    g.setAttribute("width", "200");
    g.setAttribute("height", "200");

    g.appendChild(container);
    return g;
};

export { graphInfo, updateGraphInfo };
