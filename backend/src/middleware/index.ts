import express, { NextFunction, Request, Response } from "express";
import { ENV } from "../config/env";

const middleware = express.Router();

middleware.use(express.json());

if (ENV.ENVIRONMENT === "dev") {
  middleware.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Received a ${req.method} at ${req.path}`);
    next();
  });
}

export default middleware;
