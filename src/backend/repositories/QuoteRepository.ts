import { Quote } from "../schemas/Quote";
import { QUOTES } from "./tempQuotes";

export namespace QuoteRepository {
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const parseDate = (ddMMMDate: string): Date => {
    const [day, month] = ddMMMDate.split(" ");
    const monthIndex = MONTHS.findIndex((m) => m === month);
    return new Date(2000, monthIndex >= 0 ? monthIndex : 0, parseInt(day));
  };

  export const getByDate = (date: Date): Quote | undefined => {
    return getAll().find(
      (quote) =>
        quote.date.getDate() === date.getDate() &&
        quote.date.getMonth() === date.getMonth()
    );
  };

  export const getByAuthor = (author: string): Quote | undefined => {
    return getAll().find((quote) => quote.author === author);
  };

  export const getRandom = (): Quote | undefined => {
    const quotes = getAll();
    return quotes.length === 0
      ? undefined
      : quotes[Math.floor(Math.random() * quotes.length)];
  };

  export const getAll = (): Quote[] => {
    return QUOTES.map((quote) => {
      return {
        ...quote,
        date: parseDate(quote.date),
      };
    });
  };
}
