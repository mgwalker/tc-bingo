export default (state) => {
  for (let i = 0; i < 5; i += 1) {
    // Row-wise check
    if (!state[i].some((v) => !v)) {
      return true;
    }

    // Column-wise check
    if (!state.map((row) => row[i]).some((v) => !v)) {
      return true;
    }
  }

  // tl-br diagonal
  if (!state.map((_, j) => state[j][j]).some((v) => !v)) {
    return true;
  }

  // tr-bl diagonal
  if (!state.map((_, j) => state[4 - j][j]).some((v) => !v)) {
    return true;
  }

  return false;
};
