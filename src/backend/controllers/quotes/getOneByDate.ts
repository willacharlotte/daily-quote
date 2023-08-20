import { Request, Response } from "express";
import { QuoteRepository } from "../../repositories/QuoteRepository";
import { dateSchema } from "../../schemas/Quote";

export const getOneBydate = async (req: Request, res: Response) => {
  const date = req.params.date;

  if (!date || !dateSchema.safeParse(date).success) {
    res.status(400);
    res.json({ error: "date must be of format yyyy-mm-dd" });
    return;
  }
  try {
  const { data, messages } = await QuoteRepository.getOneByDate(date);
  if (data) {
    res.json(data);
  } else {
    res.status(204);
    res.json({ message: messages });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500);
    res.json({ error: "An error occurred while fetching the quote." });
  }
};
