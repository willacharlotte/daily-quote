import { Request, Response } from "express";
import { QuoteRepository } from "../../repositories/QuoteRepository";
import { dateSchema } from "../../schemas/Quote";

export const getOneBydate = (req: Request, res: Response) => {
  const date = req.params.date;

  if (!date || !dateSchema.safeParse(date).success) {
    res.status(400);
    res.end("date must be of format dd-mm-yyyy");
    return;
  }

  const quote = QuoteRepository.getOneByDate(date);

  if (quote) {
    res.end(JSON.stringify(quote));
  } else {
    res.status(204);
    res.end("no quote for given date was found");
  }
};
