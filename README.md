# daily-quote

A website giving daily quotes, with random quote functionality

## Prerequisites

- node ^16.0.0
- npm ^8.0.0

## Setup

- `npm install` to install dependencies

## Running

- `npm run start` for prod running
- `npm run start:dev` for local development with `nodemon` and `ts-node`

## Using the quote-mapper

The quote mapper is a cmd script used for transforming `quotes.json` into a structure more similar to how the db is structured.

Usage:

- generate a json file named `quotes.json` with 366 quotes (to account for leap years) in the following format:

```json
[
  {
    "quote": "A quote",
    "author": "An author"
  },
  {
    "quote": "Another quote",
    "author": "Another author"
  }
]
```

- run `node quote-mapper.js` to generate `formatted-quotes.json` to have a json file of formatted quotes in the following format:

```json
[
  {
    "date": "1 January",
    "author": "An author",
    "content": "A quote"
  },
  {
    "date": "2 January",
    "author": "Another author",
    "content": "Another quote"
  }
]
```

- **NB:** the process is destructive, so `formatted-quotes.json` will be overwritten if it already exists

- if you want to add an id property to `formatted-quotes.json`, run `node quote-mapper.js -i`

## Collaborators

- [Marni Kleingeld](https://github.com/MarniKleingeld)
- [Lisa Nolte](https://github.com/LisaNolte1)
- [George Pauer](https://github.com/gpauer)
- [Willa Charlotte Lyle](https://github.com/WillaCharlotte)
