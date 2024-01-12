import swaggerJSDoc from "swagger-jsdoc";
import { swagger } from "./routes/auth.js";

const paths = { ...swagger };
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Collok-Easy API",
      version: "1.0.0",
      description: "API documentation for Collok-Easy",
    },
    paths,
  },
  apis: ["./routes/*.js"], // Specify the path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
