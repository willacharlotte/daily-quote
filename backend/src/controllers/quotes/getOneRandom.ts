import { Request, Response } from "express";
import { QuoteRepository } from "../../repositories/QuoteRepository";

export const getOneRandom = async (req: Request, res: Response) => {
  try {
    const { data, messages } = await QuoteRepository.getOneRandom();

    if (data) {
      res.json(data);
    } else {
      res.status(404);
      res.json({ messages: ["Random quote not found", ...messages] });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500);
    res.json({ error: "An error occurred while fetching the quote." });
  }
};
