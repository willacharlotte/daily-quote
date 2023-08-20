import { Request, Response } from "express";
import { QuoteRepository } from "../../repositories/QuoteRepository";

export const getAll = async (req: Request, res: Response) => {
  try {
      const quotes = await QuoteRepository.getAll();

      if (quotes.length > 0) {
          res.json(quotes);
      } else {
          res.status(404);
          res.json({ message: "No quotes were found" });
      }
  } catch (error) {
      console.error('An error occurred:', error);
      res.status(500);
      res.json({ error: "An error occurred while fetching the quotes." });
  }
};
