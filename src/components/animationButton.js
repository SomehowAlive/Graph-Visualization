const animationButton = (name, mainColor, onClick = null) => {
    const btn = document.createElement("button");

    btn.type = "button";
    btn.classList.add("anim-btn");
    btn.innerText = name;
    btn.style.setProperty("--color", mainColor);
    btn.style.setProperty("--hover-color", mainColor + "4F");

    btn.onclick = onClick;

    return btn;
};

export default animationButton;
