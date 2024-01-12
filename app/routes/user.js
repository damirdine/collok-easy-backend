import express from "express";
import userController from "../controllers/usersController.js";

/**
 * @swagger
 * tags:
 *   name: User profile
 *   description: APIs related to user profile edit/delete
 */

const userRouter = express.Router();

// Route pour récupérer tous les utilisateurs

userRouter.get("/", userController.me);

userRouter.put("/", userController.editProfile);

userRouter.delete("/", userController.deleteProfile);

userRouter.post("/exists", userController.isExist);

export default userRouter;

/**
 * @swagger
 * /api/v1/me:
 *   get:
 *     summary: Get user profile information
 *     description: Retrieve information about the authenticated user.
 *     tags: [User profile]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 username: john_doe
 *                 email: example@example.com
 *                 firstname: John
 *                 lastname: Doe
 *                 birthday: 1990-01-01
 *                 phone: "1234567890"
 *                 gender: male
 *                 avatar: https://example.com/avatar.jpg
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized access
 *
 */

////get /users

// *   get:
//  *     summary: Get user profile information
//  *     description: Retrieve information about the authenticated user.
//  *     tags: [User profile]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Successful response
//  *         content:
//  *           application/json:
//  *             example:
//  *               data:
//  *                 username: john_doe
//  *                 email: example@example.com
//  *                 firstname: John
//  *                 lastname: Doe
//  *                 birthday: 1990-01-01
//  *                 phone: "1234567890"
//  *                 gender: male
//  *                 avatar: https://example.com/avatar.jpg
//  *       401:
//  *         description: Unauthorized
//  *         content:
//  *           application/json:
//  *             example:
//  *               error: Unauthorized access

/**
 * @swagger
 * /api/v1/users:
 *   put:
 *     summary: Update user profile
 *     description: Update information for the authenticated user.
 *     tags: [User profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             firstname: UpdatedJohn
 *             lastname: UpdatedDoe
 *             birthday: 1990-01-01
 *             phone: "9876543210"
 *     responses:
 *       200:
 *         description: Successful update
 *         content:
 *           application/json:
 *             example:
 *               message: Profile updated successfully
 *               data :
 *                  id: 123
 *                  firstname: UpdatedJohn
 *                  lastname: UpdatedDoe
 *                  birthday: 1990-01-01
 *                  phone: "9876543210"
 *                  username: "henri"
 *                  avatar: "http://url/images.jpg"
 *                  createdAt: "1990-01-01"
 *                  updatedAt: "1990-01-01"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized access
 *   delete:
 *     summary: Delete user profile
 *     description: Delete the profile of the authenticated user.
 *     tags: [User profile]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful deletion
 *         content:
 *           application/json:
 *             example:
 *               message: Profile deleted successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized access
 */

/**
 * @swagger
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 *     description: Enter your bearer token for authentication.
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Enter your bearer token for authentication.
 */
