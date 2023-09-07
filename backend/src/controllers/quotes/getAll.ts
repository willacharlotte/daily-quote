import { Request, Response } from "express";
import { QuoteRepository } from "../../repositories/QuoteRepository";

export const getAll = async (req: Request, res: Response) => {
  try{
    const { data: quotes, messages } = await QuoteRepository.getAll();
  
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
  } catch (err){
      var error = err as Error;
      res.status(500);
      res.json({
      error: "An error occurred while processing the request.",
      message: error.message,
    });
  }
};
