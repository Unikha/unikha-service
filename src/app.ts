import "reflect-metadata"; // We need this in order to use @Decorators
import express from "express";
import Logger from "./loaders/logger";
import config from "../config.json";

async function startServer(): Promise<void> {
  const app = express();
  const PORT = process.env.PORT || config.port;

  // Loaders
  await require("./loaders").default({ expressApp: app });

  app
    .listen(PORT, () => {
      Logger.info(`Unikha server listen on port: ${PORT}`);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
