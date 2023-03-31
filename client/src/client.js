const writeEvent = (text) => {
    // <ul> element
    const listEl = document.querySelector("#events");

    // <li> element
    const itemEl = document.createElement("li");
    itemEl.innerHTML = text;

    listEl.appendChild(itemEl);
};

writeEvent("Добро пожаловать в игру");
