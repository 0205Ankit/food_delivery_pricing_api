import { Express, Response, Request } from "express";
import SwaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import logger from "./logger";
import { version } from "../../package.json";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Food Delivery Pricing API",
      version,
    },
  },
  apis: ["./src/app/**/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app: Express, port: number) {
  // swagger page
  app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerSpec));

  // docs in JSON format
  app.get("/api-docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  logger.info(`Docs available at http://localhost:${port}/api-docs`);
}

export default swaggerDocs;
