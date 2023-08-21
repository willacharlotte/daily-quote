import { Request, Response } from "express";
import { QuoteRepository } from "../../repositories/QuoteRepository";

export const getAllByAuthor = async (req: Request, res: Response) => {
  const author = req.params.name;

  if (!author) {
    res.status(400);
    res.json({ error: "No author was given?" });
    return;
  }

  const { data: quotes, messages } = await QuoteRepository.getAllByAuthor(
    author
  );

  if (!quotes) {
    console.error("An error occurred:", ...messages);
    res.status(500);
    res.json({
      error: "An error occurred while fetching the quotes.",
      messages,
    });
    return;
  }

  if (quotes.length === 0) {
    res.status(404);
    res.json({ messages });
    return;
  } else {
    res.json(quotes);
    return;
  }
};
