const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.code.toLowerCase() === "space") {
        setRandomColors();
    }
});

document.addEventListener("click", (e) => {
    const type = e.target.dataset.type;

    if (type === "lock") {
        const node =
            e.target.tagName.toLowerCase() === "i"
                ? e.target
                : e.target.children[0];

        node.classList.toggle("fa-lock-open");
        node.classList.toggle("fa-lock");
    } else if (type === "copy") {
        copyToClickboard(e.target.textContent);
    }
});

function generateRandomColor() {
    const colorCodes = "0123456789ABCDEF";
    let color = "";

    for (let i = 0; i < 6; i++) {
        color += colorCodes[Math.floor(Math.random() * colorCodes.length)];
    }

    return "#" + color;
}

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text);
}

function setRandomColors(isLoaded) {
    const colors = isLoaded ? getColorsFromHash() : [];

    cols.forEach((col, index) => {
        const text = col.querySelector("h2");
        const lock = col.querySelector("button");
        const isLocked = col.querySelector("i").classList.contains("fa-lock");

        if (isLocked) {
            colors.push(text.textContent);
            return;
        }
        const color = isLoaded
            ? colors[index]
                ? colors[index]
                : generateRandomColor()
            : generateRandomColor();

        if (!isLoaded) {
            colors.push(color);
        }

        text.textContent = color;
        col.style.background = color;

        inversionColor(text, text.textContent);
        inversionColor(lock, text.textContent);
    });
    updateHash(colors);
}

function inversionColor(item, color) {
    const luminance = chroma(color).luminance();
    item.style.color = luminance > 0.5 ? "black" : "white";
}

function updateHash(colors) {
    document.location.hash = colors
        .map((col) => col.toString().substring(1))
        .join("-");
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split("-")
            .map((color) => "#" + color);
    }
    return [];
}

setRandomColors(true);
