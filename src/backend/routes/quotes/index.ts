import express from "express";
import { getAll } from "../../controllers/quotes/getAll";
import { getAllByAuthor } from "../../controllers/quotes/getAllByAuthor";
import { getOneBydate } from "../../controllers/quotes/getOneByDate";
import { getOneRandom } from "../../controllers/quotes/getOneRandom";

const quotesRoutes = express.Router();

quotesRoutes.get("/quotes", getAll);
quotesRoutes.get("/quotes/authors/:name", getAllByAuthor);
quotesRoutes.get("/quotes/dates/:date", getOneBydate);
quotesRoutes.get("/quotes/random", getOneRandom);

export default quotesRoutes;
