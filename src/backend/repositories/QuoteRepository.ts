import { Quote, dateSchema } from "../schemas/Quote";
import { QUOTES } from "./tempQuotes";

export namespace QuoteRepository {
  export const getOneByDate = (date: string): Quote | undefined => {
    dateSchema.parse(date);
    return getAll().find((quote) => quote.date === date);
  };

  export const getOneRandom = (): Quote | undefined => {
    const quotes = getAll();
    return quotes.length === 0
      ? undefined
      : quotes[Math.floor(Math.random() * quotes.length)];
  };

  export const getAllByAuthor = (author: string): Quote[] => {
    return getAll().filter((quote) => quote.author === author);
  };

  export const getAll = (): Quote[] => {
    return QUOTES;
  };
}
