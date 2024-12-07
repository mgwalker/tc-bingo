import fs from "node:fs/promises";

const getWords = (() => {
  const waiting = fs.readFile("./squares.json").then(JSON.parse);
  return () => waiting;
})();

export const getBoard = async () => {
  const words = await getWords();
  const shuffledWords = [...words].slice(0, 25);
  let m = shuffledWords.length;

  while (m > 0) {
    // Get an index for an unshuffled element.
    const i = Math.floor(Math.random() * m);
    m -= 1;

    // Swap the two elements
    const t = shuffledWords[m];
    shuffledWords[m] = shuffledWords[i];
    shuffledWords[i] = t;
  }

  // Set the free square in the middle
  shuffledWords[12] = "FOIA (free)";

  return {
    squares: shuffledWords,
    state: [...Array(25)].map((_, i) => i === 12),
  };
};

export const isBingo = (state) => {
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
