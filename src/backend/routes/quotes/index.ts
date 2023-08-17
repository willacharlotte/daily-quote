import express from "express";

const quotesRoutes = express.Router();

quotesRoutes.get("/quotes", (req, res) => {
  res.end("I work!");
});

export default quotesRoutes;
