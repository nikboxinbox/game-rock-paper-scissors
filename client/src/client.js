const dictionary = {
  rock: "КАМЕНЬ",
  scissors: "НОЖНИЦЫ",
  paper: "БУМАГА",
};

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

const addButtonListeners = () => {
  ["rock", "scissors", "paper"].forEach((id) => {
    const button = document.getElementById(id);
    button.addEventListener("click", () => {
      sock.emit("choice", dictionary[id]);
    });
  });
};

writeEvent("Добро пожаловать в игру");

const sock = io();
sock.on("message", writeEvent);

document.querySelector("#chat-form").addEventListener("submit", submitForm);

addButtonListeners();
