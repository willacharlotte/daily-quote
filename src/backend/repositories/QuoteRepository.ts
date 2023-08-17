import Quote from "../models/Quote";

export namespace QuoteRepository {
  const getByDate = (date: Date): Quote | null => {
    return null;
  };

  const getByAuthor = (author: string): Quote | null => {
    return null;
  };

  const getRandom = (): Quote | null => {
    return null;
  };

  const getAll = (): Quote[] => {
    return [];
  };
}
