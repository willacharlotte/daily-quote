import { Quote } from "../schemas/Quote";
import { QUOTES } from "./tempQuotes";

export namespace QuoteRepository {
  export const getOneRandom = (): Quote | undefined => {
    const quotes = getAll();
    return quotes.length === 0
      ? undefined
      : quotes[Math.floor(Math.random() * quotes.length)];
  };

  export const getAll = (author : string = "", date : string = ""): Quote[] => {
    return QUOTES.filter(quote => {
      return (author == "" && date == "")
          || (author != "" && author === quote.author)
          || (date != "" && new Date(date) === new Date(quote.date))
    });
  };
}
