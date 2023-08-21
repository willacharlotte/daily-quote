import { Request, Response } from "express";
import { QuoteRepository } from "../../repositories/QuoteRepository";import {string} from "zod";

export const getAll = (req: Request, res: Response) => {
  const quotes = QuoteRepository.getAll(req.query.author ? String(req.query.author) : "",
      req.query.date ? String(req.query.date) : "");
  console.log(req)
  if (quotes) {
    res.end(JSON.stringify(quotes));
  } else {
    res.status(204);
    res.end("no quotes were found");
  }
};
