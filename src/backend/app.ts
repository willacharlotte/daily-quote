import express from "express";
import staticRoutes from "./routes/static";
import { ENV } from "./config/env";
import apiMiddleware from "./middleware";
import quotesRoutes from "./routes/quotes";

const app = express();

app.use(apiMiddleware);

app.use(quotesRoutes);

app.use(staticRoutes);

app.listen(ENV.PORT, () => {
  console.log(`App listening on ${ENV.PORT}`);
  if (ENV.ENVIRONMENT === "dev") {
    console.log(
      `psst, here's a link, you lazy potato: http://localhost:${ENV.PORT}/`
    );
  }
});
