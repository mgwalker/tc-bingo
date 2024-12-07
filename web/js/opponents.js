const sidebar = document.querySelector(".sidebar");
const sidebarGridContainer = sidebar.querySelector(".sidebar .grids");

export const addOpponentState = ({ id, state }) => {
  const grid = document.createElement("div");
  grid.classList.add("opponent");
  grid.dataset.id = id;

  for (const value of state.flat()) {
    const node = document.createElement("div");
    node.dataset.state = `${value ? "on" : "off"}`;
    grid.append(node);
  }
  sidebarGridContainer.append(grid);
};

export const initializeOpponents = (opponents) => {
  for (const state of opponents) {
    addOpponentState(state);
  }
};

export const updateOpponent = ({ id, state }) => {
  const grid = document.querySelector(
    `.sidebar .grids .opponent[data-id="${id}"]`,
  );
  grid.innerHTML = "";

  for (const value of state.flat()) {
    const node = document.createElement("div");
    node.dataset.state = `${value ? "on" : "off"}`;
    grid.append(node);
  }
};

export const opponentWins = ({ id, username }, socket) => {
  const bingos = sidebar.querySelector(".bingos ul");
  const exists = bingos.querySelector(`li[data-id="${id}"]`);

  if (!exists) {
    const user = document.createElement("li");
    user.dataset.id = id;
    user.innerText = username;
    bingos.append(user);
  }

  if (id === socket.id) {
    setTimeout(() => {
      alert("BINGO!");
    }, 1);
  }
};

export const removeOpponent = (id) => {
  document.querySelector(`.sidebar .grids .opponent[data-id="${id}"]`).remove();
  document.querySelector(`.sidebar .bingos ul li[data-id="${id}"]`).remove();
};
