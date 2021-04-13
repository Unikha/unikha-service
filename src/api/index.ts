import { Router } from "express";
import nft from "./routes/nft";
import metrics from "./routes/metrics";

// guaranteed to get dependencies
export default () => {
  const app = Router();
  nft(app);
  metrics(app);

  return app;
};
