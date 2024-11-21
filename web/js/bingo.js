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

export const initializeCard = (data) => {
  const card = document.querySelector(".my.bingo-card");
  const grid = data.flat();
  for (const cell of grid) {
    const node = document.createElement("div");
    node.dataset.state = "off";
    node.addEventListener("click", () => {
      toggle(node);
    });
    node.innerText = cell;
    card.append(node);
  }
};
