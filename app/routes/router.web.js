import express from "express";
import authController from "../controllers/authController.js";

const webRouter = express.Router();

// Authentication and User management
webRouter.get("/auth/reset-password", authController.resetPasswordHtml);

export default webRouter;

/**
 * @swagger
 * /auth/reset-password?token={token}:
 *   get:
 *     summary: Password reset web pages
 *     tags: [Authentication]
 *     parameters:
 *        - in: path
 *          name: token
 *          schema:
 *              type: string
 *              required: true
 *              description: jwt token reset password
 *
 *     responses:
 *       200:
 *         description: Page found
 *         content:
 *           text/html:
 *                type: string
 *                examplle : <a href="/auth/reset-password?token=">go</a>
 *       405:
 *         description: Page not found
 *         content:
 *           application/json:
 *             example:
 *               error: User not exist or Server Error
 */
