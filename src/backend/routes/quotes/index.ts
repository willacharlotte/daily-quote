import express from "express";
import { getAll } from "../../controllers/quotes/getAll";
import { getOneRandom } from "../../controllers/quotes/getOneRandom";

const quotesRoutes = express.Router();

quotesRoutes.get("/quotes", getAll);
quotesRoutes.get("/quotes/random", getOneRandom);

export default quotesRoutes;
