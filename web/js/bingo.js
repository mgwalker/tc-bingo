import { getSocket } from "./socket.js";

const toggle = (node) => {
  if (node.dataset.state === "off") {
    node.dataset.state = "on";
  } else {
    node.dataset.state = "off";
  }

  const cells = Array.from(
    node.parentNode.querySelectorAll("[data-state]"),
  ).map((n) => n.dataset.state === "on");

  const state = [
    cells.slice(0, 5),
    cells.slice(5, 10),
    cells.slice(10, 15),
    cells.slice(15, 20),
    cells.slice(20),
  ];

  getSocket().send({ action: "update-state", data: state });
};

export const initializeCard = ({ squares, state }) => {
  const card = document.querySelector(".my.bingo-card");

  for (let i = 0; i < squares.length; i += 1) {
    const square = squares[i];
    const on = state[i];

    const node = document.createElement("div");
    node.dataset.state = on ? "on" : "off";

    if (i !== 12) {
      node.addEventListener("click", () => {
        toggle(node);
      });
    }

    const content = document.createElement("div");
    content.innerText = square;
    node.append(content);
    card.append(node);
  }
};
