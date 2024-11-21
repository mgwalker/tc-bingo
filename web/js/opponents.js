const sidebar = document.querySelector(".sidebar");

export const addOpponentState = ({ id, state }) => {
  const grid = document.createElement("div");
  grid.classList.add("bingo-card");
  grid.classList.add("opponent");
  grid.dataset.id = id;

  for (const value of state.flat()) {
    const node = document.createElement("div");
    node.dataset.state = `${value ? "on" : "off"}`;
    grid.append(node);
  }
  sidebar.append(grid);
};

export const initializeOpponents = (opponents) => {
  for (const state of opponents) {
    addOpponentState(state);
  }
};

export const updateOpponent = ({ id, state }) => {
  const grid = document.querySelector(`.bingo-card.opponent[data-id="${id}"]`);
  grid.innerHTML = "";

  for (const value of state.flat()) {
    const node = document.createElement("div");
    node.dataset.state = `${value ? "on" : "off"}`;
    grid.append(node);
  }
};

export const removeOpponent = (id) => {
  document.querySelector(`.bingo-card[data-id="${id}"]`).remove();
};
