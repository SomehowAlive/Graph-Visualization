import svg from "../components/svg";
const NodeRadius = 30;

const init = () => {
    window.oncontextmenu = (e) => {
        e.preventDefault();
    };
    const svgContainer = svg(screen.width, screen.height);
    document.body.appendChild(svgContainer);
};

export { init, NodeRadius };
