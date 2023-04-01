const writeEvent = (text) => {
    // <ul> element
    const listEl = document.querySelector("#events");

    // <li> element
    const itemEl = document.createElement("li");
    itemEl.innerHTML = text;

    listEl.appendChild(itemEl);
};

const submitForm = (e) => {
    e.preventDefault();
    const input = document.querySelector("#chat");
    const text = input.value;
    input.value = "";

    sock.emit("message", text);
};

writeEvent("Добро пожаловать в игру");

const sock = io();
sock.on("message", writeEvent);

document.querySelector("#chat-form").addEventListener("submit", submitForm);
