const queueElem = (val) => {
    const elem = document.createElement("div");
    elem.classList.add("queue-elem");
    elem.innerText = val;
    return elem;
};

const queueComponent = () => {
    const element = document.createElement("div");
    let queue = [];
    element.classList.add("queue");

    const enqueue = (val) => {
        queue.push(val);
        const newElem = queueElem(val);
        element.appendChild(newElem);
        newElem.offsetHeight;
        newElem.classList.add("queue-elem-show");
    };

    const dequeue = () => {
        const toDelete = element.firstChild;
        if (toDelete) {
            toDelete.classList.remove("queue-elem-show");
            toDelete.addEventListener("transitionend", () => {
                toDelete.remove();
            });
        }
        return queue.shift();
    };

    const length = () => queue.length;
    const reset = () => {
        queue = [];
        element.childNodes.forEach((c) => c.remove());
    };

    return { element, enqueue, dequeue, length, reset };
};

export default queueComponent;
