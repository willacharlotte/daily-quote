# daily-quote

A website providing daily quotes, with random quote and (potential) calendar functionality

## Prerequisites

- node ^16.0.0
- npm ^8.0.0

## Notes

This is a parent package for the frontend and backend packages, so look at those for more detailed info.

Scripts here are just references to the scripts in the sub-packages.

## Setup

- `npm run fe:install` to install frontend dependencies
- `npm run be:install` to install backend dependencies
- `cp ./backend/.env.example ./backend/.env` and populate with values from another dev

## Running

- `npm run be:start` for running backend
- `npm run fe:start` for running frontend

## Collaborators

- [George Pauer](https://github.com/gpauer)
- [Lisa Nolte](https://github.com/LisaNolte1)
- [Marni Kleingeld](https://github.com/MarniKleingeld)
- [Willa Charlotte Lyle](https://github.com/WillaCharlotte)

## Using the quote-mapper (deprecated)

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
    "date": "01-01-2000",
    "author": "An author",
    "content": "A quote"
  },
  {
    "date": "02-01-2000",
    "author": "Another author",
    "content": "Another quote"
  }
]
```

- **NB:** the process is destructive, so `formatted-quotes.json` will be overwritten if it already exists

- if you want to add an id property to `formatted-quotes.json`, run `node quote-mapper.js -i`
