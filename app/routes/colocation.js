import express from "express";
import * as colocationController from "../controllers/colocationController.js";

const colocationRouter = express.Router();


colocationRouter.get(
  "/", 
  colocationController.getColocations);

colocationRouter.get(
  "/:colocationID",
  colocationController.getColocationById);

colocationRouter.post(
  "/",
   colocationController.createColocation);
// Faire une update one pour changer les infos ?

colocationRouter.get(
  "/:colocationID/admin/",
  colocationController.getColocationAdmin
);

colocationRouter.put(
  "/:colocationID/admin",
  colocationController.updateColocationAdmin
);

colocationRouter.put(
  "/:colocationID/members",
  colocationController.addColocationMember
);

colocationRouter.delete(
  "/:colocationID/members/",
  colocationController.deleteColocationMember
);
export default colocationRouter;


/**
 * @swagger
 * tags:
 *   name: Colocation
 *   description: APIs related to colocation services
 */

/**
 * @swagger
 * /api/v1/colocation:
 *   get:
 *     summary: Get all colocations
 *     description: Retrieve a list of all available colocations.
 *     tags: [Colocation]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [
 *                 {
 *                   "id": 1,
 *                   "createdAt": "2023-12-21T09:38:19.000Z",
 *                   "updatedAt": "2023-12-21T09:38:19.000Z",
 *                   "name": "Colocation 1",
 *                   "admin_user_id": 1
 *                 },
 *                 {
 *                   "id": 2,
 *                   "createdAt": "2023-12-21T09:38:19.000Z",
 *                   "updatedAt": "2023-12-21T09:38:19.000Z",
 *                   "name": "Colocation 2",
 *                   "admin_user_id": 6
 *                 }
 *               ]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

  /**
 * @swagger
 * /api/v1/colocation/{colocationID}:
 *   get:
 *     summary: Get colocation by ID
 *     description: Retrieve information about a specific colocation by its ID.
 *     tags: [Colocation]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: colocationID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the colocation
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {
 *                 "id": 8,
 *                 "createdAt": "2023-12-21T10:09:45.000Z",
 *                 "updatedAt": "2023-12-21T10:09:45.000Z",
 *                 "name": "My Colocation bis encore plus",
 *                 "admin_user_id": 8
 *               }
 *       404:
 *         description: Colocation not found
 *         content:
 *           application/json:
 *             example:
 *               error: Colocation not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

  /**
 * @swagger
 * /api/v1/colocation:
 *   post:
 *     summary: Create a new colocation
 *     description: Create a new colocation with the provided information.
 *     tags: [Colocation]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: My Colocation
 *             admin_user_id: 3
 *     responses:
 *       201:
 *         description: Colocation created successfully
 *         content:
 *           application/json:
 *             example:
 *               data: {
 *                 "id": 8,
 *                 "createdAt": "2023-12-21T10:09:45.000Z",
 *                 "updatedAt": "2023-12-21T10:09:45.000Z",
 *                 "name": "My Colocation bis encore plus",
 *                 "admin_user_id": 8
 *               }
 *       400:
 *         description: Bad Request - Name and admin_user_id are required.
 *         content:
 *           application/json:
 *             example:
 *               error: Bad Request - Name and admin_user_id are required.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/colocation/{colocationID}/admin/:
 *   get:
 *     summary: Get colocation admin ID
 *     description: Retrieve information about the colocation associated with a specific admin user.
 *     tags: [Colocation]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: colocationID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the colocation
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {
 *                 "id": 8,
 *                 "createdAt": "2023-12-21T10:09:45.000Z",
 *                 "updatedAt": "2023-12-21T10:09:45.000Z",
 *                 "name": "My Colocation bis encore plus",
 *                 "admin_user_id": 8
 *               }
 *       404:
 *         description: Colocation not found for admin user
 *         content:
 *           application/json:
 *             example:
 *               error: Colocation not found for admin user
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */


/**
 * @swagger
 * /api/v1/colocation/{colocationID}/admin:
 *   put:
 *     summary: Update colocation admin
 *     description: Update the admin user of a specific colocation.
 *     tags: [Colocation]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: colocationID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the colocation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             newAdminID: 2
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {
 *                 "id": 8,
 *                 "createdAt": "2023-12-21T10:09:45.000Z",
 *                 "updatedAt": "2023-12-21T10:09:45.000Z",
 *                 "name": "My Colocation bis encore plus",
 *                 "admin_user_id": 8
 *               }
 *       404:
 *         description: Colocation not found
 *         content:
 *           application/json:
 *             example:
 *               error: Colocation not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */


/**
 * @swagger
 * /api/v1/colocation/{colocationID}/members:
 *   put:
 *     summary: Add colocation member
 *     description: Add a member to a specific colocation.
 *     tags: [Colocation]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: colocationID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the colocation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             user_id: 3
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {
 *                 "id": 3,
 *                 "createdAt": "2023-12-21T09:38:19.000Z",
 *                 "updatedAt": "2023-12-21T09:38:19.000Z",
 *                 "firstname": "User3",
 *                 "lastname": "Lastname3",
 *                 "email": "user3@example.com",
 *                 "password": "password",
 *                 "birthday": null,
 *                 "phone": null,
 *                 "pseudo": null,
 *                 "gender": null,
 *                 "avatar": null,
 *                 "colocation_id": "5"
 *               }
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */


/**
 * @swagger
 * /api/v1/colocation/{colocationID}/members/:
 *   delete:
 *     summary: Remove colocation member
 *     description: Remove a member from a specific colocation.
 *     tags: [Colocation]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: colocationID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the colocation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             user_id: 3
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 message: Member removed from the colocation successfully
 *       404:
 *         description: User is not a member of the colocation or User not found
 *         content:
 *           application/json:
 *             example:
 *               error: User is not a member of the colocation or User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

