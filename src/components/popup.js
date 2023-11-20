const popup = (text) => {
    const div = document.createElement("text");

    div.classList.add("popup");
    div.innerText = text;

    setTimeout(() => {
        div.classList.add("show");
    }, 100);

    setTimeout(() => {
        div.classList.remove("show");
        div.addEventListener("transitionend", () => {
            div.remove();
        });
    }, 3000);

    return div;
};

export default popup;
