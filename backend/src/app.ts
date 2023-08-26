import express from "express";
import { ENV } from "./config/env";
import apiMiddleware from "./middleware";
import quotesRoutes from "./routes/quotes";
import cors from 'cors';
import https from 'https';
import fs from 'fs';

const app = express();

const options = {
  key: fs.readFileSync('/path/to/private-key.pem'), // Path to your private key file
  cert: fs.readFileSync('/path/to/certificate.pem'), // Path to your certificate file
};

app.use(apiMiddleware);

app.use(cors({
  origin: 'https://georgep.link:443',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use(quotesRoutes);

const httpsServer = https.createServer(options, app);

httpsServer.listen(ENV.PORT, () => {
  console.log(`App listening on ${ENV.PORT}`);
  if (ENV.ENVIRONMENT === "dev") {
    console.log(
      `psst, here's a link, you lazy potato: https://georgep.link:444`
    );
  }
});
