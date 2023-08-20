import { Request, Response } from "express";
import { QuoteRepository } from "../../repositories/QuoteRepository";

export const getOneRandom = async (req: Request, res: Response) => {
  try {
    const randomQuote = await QuoteRepository.getOneRandom();

    if (randomQuote) {
        res.json(randomQuote);
    } else {
        res.status(404);
        res.json({ message: "Random quote not found" });
    }
} catch (error) {
    console.error('An error occurred:', error);
    res.status(500);
    res.json({ error: "An error occurred while fetching the quote." });
}
};
