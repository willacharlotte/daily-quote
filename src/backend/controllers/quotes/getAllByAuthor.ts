import { Request, Response } from "express";
import { QuoteRepository } from "../../repositories/QuoteRepository";

export const getAllByAuthor = (req: Request, res: Response) => {
  const author = req.params.name;

  if (!author) {
    res.status(400);
    res.end("No author was given?");
    return;
  }

  const quotes = QuoteRepository.getAllByAuthor(author);

  if (quotes) {
    res.end(JSON.stringify(quotes));
  } else {
    res.status(204);
    res.end("no quotes by given author were found");
  }
};
