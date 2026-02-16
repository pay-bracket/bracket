import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "api";
import { logging } from "./middlewares/logging.js";

const app = express();

app.use(logging);

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

const port = process.env["PORT"] ?? 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
