import express from "express";
import { ENV } from "./config/env";
import apiMiddleware from "./middleware";
import quotesRoutes from "./routes/quotes";
import cors from 'cors';

const app = express();

app.use(apiMiddleware);

app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use(quotesRoutes);

app.listen(ENV.PORT, () => {
  console.log(`App listening on ${ENV.PORT}`);
  if (ENV.ENVIRONMENT === "dev") {
    console.log(
      `psst, here's a link, you lazy potato: http://localhost:${ENV.PORT}/`
    );
  }
});