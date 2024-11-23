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

export const opponentWins = ({ id, username }) => {
  if (!sidebar.querySelector(".bingos")) {
    const bingos = document.createElement("div");
    bingos.classList.add("bingos");
    bingos.append(document.createElement("ul"));
    sidebar.append(bingos);
  }

  const bingos = sidebar.querySelector(".bingos ul");
  const user = document.createElement("li");
  user.innerText = username;
  bingos.append(user);
};

export const removeOpponent = (id) => {
  document.querySelector(`.sidebar .grids .opponent[data-id="${id}"]`).remove();
};
