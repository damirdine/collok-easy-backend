// Importations nécessaires
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

import apiV1Router from "./routes/router.js";
import webRouter from "./routes/router.web.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// http request logger
app.use(morgan("combined"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1", apiV1Router);
app.use("/", webRouter);

if (process.env.NODE_ENV !== "test") {
  // Démarrage du serveur sur le port 3000
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

export default app;
