import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import globalRoutes from "./routes";
import prisma from "./prisma";
import morgan from "morgan";
import logger from "./helpers/logger";
import swaggerDocs from "./helpers/swagger";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api", globalRoutes);

app.listen(PORT, () => {
  prisma
    .$connect()
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      throw new Error(err);
    });
  swaggerDocs(app, +PORT);
  logger.info(`App running at http://localhost:${PORT}`);
});
