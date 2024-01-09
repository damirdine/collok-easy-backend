import express from "express";
import authController from "../controllers/authController.js";

const webRouter = express.Router();

// Authentication and User management
webRouter.get("/auth/reset-password", authController.resetPasswordHtml);

export default webRouter;
