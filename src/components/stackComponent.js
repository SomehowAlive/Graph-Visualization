const stackElem = (val) => {
    const elem = document.createElement("div");
    elem.classList.add("stack-elem");
    elem.innerText = val;
    return elem;
};

const stackComponent = () => {
    const element = document.createElement("div");
    const stack = [];
    element.classList.add("stack");

    const push = (val) => {
        stack.push(val);
        const newElem = stackElem(val);
        element.appendChild(newElem);
        newElem.offsetHeight;
        newElem.classList.add("stack-elem-show");
    };

    const pop = () => {
        const toDelete = element.lastChild;
        if (toDelete) {
            toDelete.classList.remove("stack-elem-show");
            toDelete.addEventListener("transitionend", () => {
                toDelete.remove();
            });
        }
        return stack.pop();
    };

    const top = () => stack.at(stack.length - 1);

    const length = () => stack.length;

    return { element, push, pop, top, length };
};

export default stackComponent;
