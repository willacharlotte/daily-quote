import { Request, Response } from "express";
import { QuoteRepository } from "../../repositories/QuoteRepository";

export const getOneRandom = (req: Request, res: Response) => {
  const quote = QuoteRepository.getOneRandom();

  if (quote) {
    res.end(JSON.stringify(quote));
  } else {
    res.status(204);
    res.end("no quotes were found, so a random one couldn't be selected");
  }
};
