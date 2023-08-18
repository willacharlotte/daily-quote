#!/usr/bin/env node

const fs = require("fs");
const { argv } = require("process");

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const januaryFirst = new Date(2000, 0, 1);

const mapper = (quote, index) => {
  const rawDate = new Date(januaryFirst);
  rawDate.setDate(index + 1);
  const [d, m, y] = [
    rawDate.getDate(),
    rawDate.getMonth() + 1,
    rawDate.getFullYear(),
  ].map((v) => v.toString());

  const includeIndex = argv[argv.length - 1] === "-i";

  const bareMappedQuote = {
    date: `${d.padStart(2, "0")}-${m.padStart(2, "0")}-${y}`,
    author: quote["author"],
    content: quote["quote"],
  };
  return includeIndex
    ? { id: index.toString(), ...bareMappedQuote }
    : bareMappedQuote;
};

const rawQuotes = JSON.parse(fs.readFileSync("quotes.json"));

const shuffledQuotes = shuffle(rawQuotes);

const mappedQuotes = shuffledQuotes.map(mapper);

fs.writeFileSync(
  "formatted-quotes.json",
  JSON.stringify(mappedQuotes, null, 2)
);
