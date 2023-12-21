import express from "express";
import authController from "../controllers/authController.js";

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: APIs related to user authentication
 */

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

export default authRouter;

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided information.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             firstname: John
 *             lastname: Doe
 *             email: example@example.com
 *             password: your_password
 *             birthday: 1990-01-01
 *             phone: "1234567890"
 *             pseudo: john_doe
 *             gender: male
 *             avatar: https://example.com/avatar.jpg
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *                message: Registration successful
 *                token: <generated_access_token>
 *       400:
 *         description: Registration failed
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data or registration failed
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: login a user
 *     description: Register a new user with the provided information.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: example@example.com
 *             password: your_password
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *                message: Registration successful
 *                token: <generated_access_token>
 *       400:
 *         description: Registration failed
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data or registration failed
 */
