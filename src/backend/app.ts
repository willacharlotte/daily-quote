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
});
