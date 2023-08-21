import { Request, Response } from "express";
import { QuoteRepository } from "../../repositories/QuoteRepository";

export const getAllByAuthor = async (req: Request, res: Response) => {
  const author = req.params.name;

  if (!author) {
      res.status(400);
      res.json({ error: "No author was given?" });
      return;
  }

  try {
      const { data, messages } = await QuoteRepository.getAllByAuthor(author);

      if (data && data.length > 0) {
          res.json(data);
      } else {
        res.status(404);
        res.json({ message: "No quotes by the given author were found" });
      }
  } catch (error) {
      console.error('An error occurred:', error);
      res.status(500);
      res.json({ error: "An error occurred while fetching the quotes." });
  }
};
