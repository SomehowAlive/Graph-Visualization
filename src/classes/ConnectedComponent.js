export default class connectedComponent {
    static cpt = 0;
    static lastHue = -1;

    static rand(min, max) {
        return parseInt(min + (max - min + 1) * Math.random());
    }

    static randomColor() {
        const minHueDistance = 50;
        let hue;

        do {
            hue = connectedComponent.rand(0, 360);
        } while (connectedComponent.lastHue !== -1 && Math.abs(hue - connectedComponent.lastHue) < minHueDistance);

        connectedComponent.lastHue = hue;

        return `hsl(${hue},${connectedComponent.rand(80, 100)}%,${connectedComponent.rand(35, 55)}%)`;
    }

    constructor(nodes = new Set()) {
        this.name = `C${++connectedComponent.cpt}`;
        this.color = connectedComponent.randomColor();
        this.nodes = new Set(nodes);
    }

    addNode(s) {
        this.nodes.add(s);
    }
}
