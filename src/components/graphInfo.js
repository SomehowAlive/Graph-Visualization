const updateGraphInfo = (graph) => {
    document.querySelector(".graph-order").textContent = `Order ${graph.order()}`;
    document.querySelector(".graph-size").textContent = `Size ${graph.size()}`;
};

const graphInfo = (graph, x, y) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    const graphOrder = document.createElement("p");
    const graphSize = document.createElement("p");

    graphOrder.textContent = `Order ${graph.order()}`;
    graphSize.textContent = `Size  ${graph.size()}`;

    graphOrder.classList.add("graph-order");
    graphSize.classList.add("graph-size");

    g.setAttribute("x", x);
    g.setAttribute("y", y);
    g.setAttribute("width", 150);
    g.setAttribute("height", 150);

    g.appendChild(graphOrder);
    g.appendChild(graphSize);

    return g;
};

export { graphInfo, updateGraphInfo };
