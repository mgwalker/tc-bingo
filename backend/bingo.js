const words = [
  "Year to date",
  "Bench",
  "BD",
  "ZScaler",
  "FITARA",
  "I'm going to share my screen",
  "Can you see that?",
  "Slow down for the captioner",
  "Cat walks across the screen",
  "LT",
  "You're on mute.",
  "Kudos",
  "FY23 strategic bets",
  "Color of Money",
  "ATO",
  "Interruption by an outside source (dog, doorbell, etc.)",
  "Next slide",
  "Speaker wearing a hat",
  "Speaker is outdoors",
  "Partner presents",
  "Opinionated T-shirt",
  "Inanimate object during cuteness",
  "Cute that is not a dog, a cat, or a human child.",
  "Kudoer self-references the length of their kudo",
  "Presenter self-references going long",
  "New employee welcomed",
  "Pet touching person's face or head",
  "For purposes of inclusion/accessibility",
  "Self-deprecating comments about body/aging in self-description",
  "Identifiable bird calls",
  "Fiscal year",
  "Unsuccessful screen sharing",
  "Teeth",
  "Presenter has 15+ tabs open",
  "Lo-fi music",
  "Presenter has so many tabs that no text appears in the tab title",
  "leverage",
  "utilize",
  "realignment",
  "best serve the org",
  "apologizing for using too many acronyms",
  "Alan makes a comment about going over time",
  "trying to share a single window but showing the whole desktop",
  "PRs welcome",
];

export const getBoard = () => {
  const shuffledWords = [...words];
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

  return [
    shuffledWords.slice(0, 5),
    shuffledWords.slice(5, 10),
    shuffledWords.slice(10, 15),
    shuffledWords.slice(15, 20),
    shuffledWords.slice(20, 25),
  ];
};

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
