import Node from "./Node";

export default class Edge {
    /**
     *
     * @param {Node} startNode - the start node Object
     * @param {Node} endNode - the end Node Object
     * @param {Number} weight - the weight of the edge
     */
    constructor(startNode, endNode, weight = 0) {
        this.startNode = startNode;
        this.endNode = endNode;
        this.weight = weight;
    }

    /**
     *
     * @param {Number} newWeight
     */
    setWeight(newWeight) {
        this.weight = newWeight;
    }
}
