import { Request, Response } from "express";
import { QuoteRepository } from "../../repositories/QuoteRepository";

export const getAll = (req: Request, res: Response) => {
  const quotes = QuoteRepository.getAll();
  if (quotes) {
    res.end(JSON.stringify(quotes));
  } else {
    res.status(204);
    res.end("no quotes were found");
  }
};
