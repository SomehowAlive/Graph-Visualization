import Graph from "./Graph";
import Node from "./Node";
import { highlightNode, highlightEdge, resetGraphStyles, resetAnimArea, g } from "../components/Ui";
import popup from "../components/popup";
import connectedComponent from "./ConnectedComponent";

export default class Algorithms {
    /**
     * @param {Graph} graph  - the graph to perform DFS on
     * @param {String} s - the name of the node to start DFS from
     */
    static DFS(graph, s) {
        const visited = new Set();
        const stack = [];

        stack.push(s);

        while (stack.length) {
            const currentNode = stack.pop();
            if (!visited.has(currentNode)) {
                console.log(currentNode);
                visited.add(currentNode);
                const successors = graph.getSuccessors(currentNode);
                successors.forEach((successor) => {
                    if (!visited.has(successor)) stack.push(successor);
                });
            }
        }
    }

    static async DFSAnimation(graph, s, stack, delay = 1000) {
        resetGraphStyles();

        const visited = new Set();
        stack.push(s);
        await new Promise((resolve) => setTimeout(resolve, delay));

        while (stack.length()) {
            const currentNode = stack.pop();
            console.log(currentNode);
            visited.add(currentNode);
            highlightNode(currentNode);
            await new Promise((resolve) => setTimeout(resolve, delay * 0.8));

            const successors = graph.getSuccessors(currentNode);
            for (const successor of successors) {
                if (!visited.has(successor)) {
                    stack.push(successor);
                    visited.add(successor);
                    highlightEdge(currentNode, successor);
                    highlightNode(successor);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                }
            }
        }
        document.body.appendChild(popup("End of Depth First Search Animation !"));
        document.querySelector(".svg-container").classList.remove("animating");
        stack.reset();
        resetAnimArea();
    }

    static async DFSAnimationV2(graph, s, stack, delay = 1000) {
        resetGraphStyles();
        await new Promise((resolve) => setTimeout(resolve, delay * 0.5));

        const visited = new Set();
        stack.push(s);
        await new Promise((resolve) => setTimeout(resolve, delay));

        while (visited.size !== graph.order()) {
            let currentNode = null;
            if (!stack.length()) {
                do {
                    currentNode = graph.nodes[parseInt(Math.random() * graph.nodes.length)].name;
                } while (visited.has(currentNode));
                stack.push(currentNode);
            }
            await new Promise((resolve) => setTimeout(resolve, delay * 0.5));
            currentNode = stack.pop();
            console.log(currentNode);
            visited.add(currentNode);
            highlightNode(currentNode);
            const successors = graph.getSuccessors(currentNode);
            for (const successor of successors) {
                if (!visited.has(successor)) {
                    stack.push(successor);
                    visited.add(successor);
                    console.log(successor);
                    highlightEdge(currentNode, successor);
                    highlightNode(successor);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                }
            }
        }
        document.body.appendChild(popup("End of Depth First Search Animation !"));
        document.querySelector(".svg-container").classList.remove("animating");
        stack.reset();
        resetAnimArea();
    }

    /**
     *
     * @param {Graph} graph - the graph to perform BFS on
     * @param {Node} s - the node to start BFS from
     */
    static BFS(graph, s) {
        const visited = new Set();
        const queue = [];
        queue.push(s);
        visited.add(s);

        while (queue.length) {
            const current = queue.shift();
            console.log(current);
            const successors = graph.getSuccessors(current);
            successors.forEach((successor) => {
                if (!visited.has(successor)) {
                    visited.add(successor);
                    queue.push(successor);
                }
            });
        }
    }

    static async BFSAnimation(graph, s, queue, delay = 1000) {
        resetGraphStyles();
        const visited = new Set();
        visited.add(s);
        queue.enqueue(s);
        await new Promise((resolve) => setTimeout(resolve, delay));

        while (queue.length()) {
            const current = queue.dequeue();
            console.log(current);
            highlightNode(current);
            const successors = graph.getSuccessors(current);
            for (const successor of successors) {
                if (!visited.has(successor)) {
                    queue.enqueue(successor);
                    visited.add(successor);
                    console.log(successor);
                    highlightEdge(current, successor);
                    highlightNode(successor);
                    await new Promise((resolve) => setTimeout(resolve, delay * 0.8));
                }
            }
        }
        document.body.appendChild(popup("End of Breadth First Search Animation !"));
        document.querySelector(".svg-container").classList.remove("animating");
        queue.reset();
        resetAnimArea();
    }

    static async BFSAnimationV2(graph, s, queue, delay = 1000) {
        resetGraphStyles();
        await new Promise((resolve) => setTimeout(resolve, delay * 0.5));

        const visited = new Set();
        visited.add(s);
        queue.enqueue(s);
        await new Promise((resolve) => setTimeout(resolve, delay * 0.5));

        while (visited.size !== graph.order()) {
            let current = null;
            if (!queue.length()) {
                do {
                    current = graph.nodes[parseInt(Math.random() * graph.order())].name;
                } while (visited.has(current));
                queue.enqueue(current);
            }
            await new Promise((resolve) => setTimeout(resolve, delay * 0.5));
            current = queue.dequeue();
            console.log(current);
            highlightNode(current);
            visited.add(current);
            const successors = graph.getSuccessors(current);
            for (const successor of successors) {
                if (!visited.has(successor)) {
                    queue.enqueue(successor);
                    console.log(successor);
                    visited.add(successor);
                    highlightEdge(current, successor);
                    highlightNode(successor);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                }
            }
        }
        document.body.appendChild(popup("End of Breadth First Search Animation !"));
        document.querySelector(".svg-container").classList.remove("animating");
        queue.reset();
        resetAnimArea();
    }

    static getCC(graph) {
        const CC = [];
        const visited = new Set();
        for (const u of graph.nodes) {
            if (!visited.has(u.name)) {
                const tmpSCC = new connectedComponent();
                tmpSCC.addNode(u.name);
                for (const v of graph.nodes) {
                    if (u !== v && !visited.has(v.name) && graph.path(u.name, v.name)) {
                        tmpSCC.addNode(v.name);
                        visited.add(v.name);
                    }
                }
                visited.add(u.name);
                CC.push(tmpSCC);
            }
        }
        console.log(CC);
        return CC;
    }

    static getSCC(graph) {
        const SCC = [];
        const visited = new Set();
        for (const u of graph.nodes) {
            if (!visited.has(u.name)) {
                const tmpSCC = new connectedComponent();
                tmpSCC.addNode(u.name);
                for (const v of graph.nodes) {
                    if (u !== v && !visited.has(v.name) && graph.path(u.name, v.name) && graph.path(v.name, u.name)) {
                        tmpSCC.addNode(v.name);
                        visited.add(v.name);
                    }
                }
                visited.add(u.name);
                SCC.push(tmpSCC);
            }
        }
        console.log(SCC);
        return SCC;
    }

    static topologicalSort(graph) {
        const result = [];
        const visited = new Set();

        function dfs(node) {
            visited.add(node.name);

            const successors = graph.getSuccessors(node.name);
            for (const successor of successors) {
                if (!visited.has(successor)) {
                    dfs(graph.getNode(successor));
                }
            }

            result.unshift(node);
        }

        // Iterate through all nodes in case the graph is disconnected
        for (const node of graph.nodes) {
            if (!visited.has(node.name)) {
                dfs(node);
            }
        }

        console.log(result);
        return result;
    }

    static async topologicalSortV2(graph, delay = 1000) {
        resetGraphStyles();

        const result = [];
        const visited = new Set();

        function dfs(node) {
            visited.add(node.name);

            const successors = graph.getSuccessors(node.name);
            for (const successor of successors) {
                if (!visited.has(successor)) {
                    dfs(graph.getNode(successor));
                }
            }

            result.unshift(node);
        }

        for (const node of graph.nodes) {
            if (!visited.has(node.name)) {
                dfs(node);
            }
        }

        for (const node of result) {
            highlightNode(node.name);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }

        document.body.appendChild(popup("End of Topological Sorting Animation !"));
        document.querySelector(".svg-container").classList.remove("animating");
        resetAnimArea();
    }
}
