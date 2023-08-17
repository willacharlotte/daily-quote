import express from "express";

const staticRouter = express.Router();

staticRouter.use("/", express.static(`${__dirname}/../../../frontend/`));

export default staticRouter;
