import svg from "../components/svg";
const NodeRadius = 30;

const init = () => {
    window.oncontextmenu = (e) => {
        e.preventDefault();
    };
    document.body.appendChild(svg(screen.width, screen.height));
};

export { init, NodeRadius };
