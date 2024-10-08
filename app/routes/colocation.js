import express from "express";
import colocationController from "../controllers/colocationController.js";
import colocationValidation from "../middleware/validations/colocation_new.js";
import { handleUserColocationAccess } from "../middleware/validations/index.js";

const colocationRouter = express.Router();


colocationRouter.get(
  "/",
  colocationController.getColocations
  );

colocationRouter.get(
  "/:colocationID",
  colocationValidation.validateGetColocationById,
  handleUserColocationAccess,
  colocationController.getColocationById
  );

colocationRouter.post(
  "/",
  colocationValidation.validateCreateColocation,
  colocationController.createColocation
  );

colocationRouter.put(
    "/:colocationID",
    colocationValidation.validateUpdateColocationName,
    colocationController.updateColocationName
  );

colocationRouter.delete(
  "/:colocationID",
  colocationValidation.validateDeleteColocation,
  colocationController.deleteColocation
  );

colocationRouter.get(
  "/:colocationID/admin/",
  colocationValidation.validateGetColocationAdmin,
  colocationController.getColocationAdmin
);

colocationRouter.put(
  "/:colocationID/admin",
  colocationValidation.validateUpdateColocationAdmin,
  colocationController.updateColocationAdmin
);

colocationRouter.put(
  "/:colocationID/members",
  colocationValidation.validateAddColocationMember,
  colocationController.addColocationMember
);

colocationRouter.delete(
  "/:colocationID/members/",
  colocationValidation.validateDeleteColocationMember,
  colocationController.deleteColocationMember
);

colocationRouter.get(
  "/:colocationID/members",
  colocationValidation.validateGetColocationMembers,
  colocationController.getColocationMembers
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
 *               data:
 *                 - id: 1
 *                   created_at: "2023-12-21T09:38:19.000Z"
 *                   updated_at: "2023-12-21T09:38:19.000Z"
 *                   name: "Colocation 1"
 *                   admin_user_id: 1
 *                   admin_user:
 *                     id: 1
 *                     firstname: "User1"
 *                     lastname: "Lastname1"
 *                     pseudo: "Pseudo1"
 *                 - id: 2
 *                   created_at: "2023-12-21T09:38:19.000Z"
 *                   updated_at: "2023-12-21T09:38:19.000Z"
 *                   name: "Colocation 2"
 *                   admin_user_id: 6
 *                   admin_user:
 *                     id: 6
 *                     firstname: "User6"
 *                     lastname: "Lastname6"
 *                     pseudo: "Pseudo6"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur interne du serveur
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
 *                 "created_at": "2023-12-21T10:09:45.000Z",
 *                 "updated_at": "2023-12-21T10:09:45.000Z",
 *                 "name": "My Colocation bis encore plus",
 *                 "admin_user_id": 8
 *               }
 *       403:
 *         description: Accès refusé à cette colocation.
 *         content:
 *           application/json:
 *             example:
 *               error: Accès refusé à cette colocation.
 *       404:
 *         description: Colocation non trouvée
 *         content:
 *           application/json:
 *             example:
 *               error: Colocation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur interne du serveur
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
 *     responses:
 *       201:
 *         description: Colocation created successfully
 *         content:
 *           application/json:
 *             example:
 *               data: {
 *                 "id": 8,
 *                 "created_at": "2023-12-21T10:09:45.000Z",
 *                 "updated_at": "2023-12-21T10:09:45.000Z",
 *                 "name": "My Colocation bis encore plus",
 *                 "admin_user_id": 8
 *               }
 *       400:
 *         description: Bad Request - Name and admin_user_id are required.
 *         content:
 *           application/json:
 *             example:
 *               error: Bad Request - Name and admin_user_id are required.
 *       422:
 *         description: Le nom de la colocation doit être unique.
 *         content:
 *           application/json:
 *             example:
 *               error: Le nom de la colocation doit être unique.
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur interne du serveur
 */

  /**
 * @swagger
 * /api/v1/colocation/{colocationID}:
 *   put:
 *     summary: Update colocation name
 *     description: Update the name of a specific colocation.
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
 *             name: "New Colocation Name"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {
 *                 "id": 5,
 *                 "created_at": "2023-12-21T09:38:19.000Z",
 *                 "updated_at": "2023-12-21T09:38:19.000Z",
 *                 "name": "New Colocation Name",
 *                 "admin_user_id": 8
 *               }
 *       403:
 *         description: Utilisateur non autorisé
 *         content:
 *           application/json:
 *             example:
 *               error: Utilisateur non autorisé
 *       404:
 *         description: Colocation non trouvée
 *         content:
 *           application/json:
 *             example:
 *               error: Colocation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur interne du serveur
 */

  /**
 * @swagger
 * /api/v1/colocation/{colocationID}:
 *   delete:
 *     summary: Delete colocation
 *     description: Delete a specific colocation by its ID.
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
 *                 message: Colocation deleted successfully.
 *       403:
 *         description: Utilisateur non autorisé
 *         content:
 *           application/json:
 *             example:
 *               error: Utilisateur non autorisé
 *       404:
 *         description: Colocation non trouvée
 *         content:
 *           application/json:
 *             example:
 *               error: Colocation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur interne du serveur
 */

/**
 * @swagger
 * /api/v1/colocation/{colocationID}/admin/:
 *   get:
 *     summary: Get colocation admin
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
 *               data:
 *                 id: 2
 *                 created_at: "2023-12-21T09:38:19.000Z"
 *                 updated_at: "2023-12-21T12:43:11.000Z"
 *                 firstname: "User2"
 *                 lastname: "Lastname2"
 *                 email: "user2@example.com"
 *                 password: "password"
 *                 birthday: null
 *                 phone: null
 *                 pseudo: null
 *                 gender: null
 *                 avatar: null
 *                 colocation_id: null
 *       404:
 *         description: Colocation non trouvée pour l'utilisateur admin
 *         content:
 *           application/json:
 *             example:
 *               error: Colocation non trouvée pour l'utilisateur admin
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur interne du serveur
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
 *             user_id: 2
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {
 *                 "id": 8,
 *                 "created_at": "2023-12-21T10:09:45.000Z",
 *                 "updated_at": "2023-12-21T10:09:45.000Z",
 *                 "name": "My Colocation bis encore plus",
 *                 "admin_user_id": 8
 *               }
 *       403:
 *         description: Utilisateur non autorisé
 *         content:
 *           application/json:
 *             example:
 *               error: Utilisateur non autorisé
 *       404:
 *         description: Colocation non trouvée
 *         content:
 *           application/json:
 *             example:
 *               error: Colocation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur interne du serveur
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
 *                 "created_at": "2023-12-21T09:38:19.000Z",
 *                 "updated_at": "2023-12-21T09:38:19.000Z",
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
 *       403:
 *         description: Utilisateur non autorisé
 *         content:
 *           application/json:
 *             example:
 *               error: Utilisateur non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             example:
 *               error: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur interne du serveur
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
 *         description: Utilisateur retiré de la colocation avec succès.
 *         content:
 *           application/json:
 *             example:
 *                 message: Utilisateur retiré de la colocation avec succès.
 *       403:
 *         description: Utilisateur non autorisé
 *         content:
 *           application/json:
 *             example:
 *               error: Utilisateur non autorisé
 *       404:
 *         description: L'utilisateur n'est pas membre de la colocation ou Utilisateur non trouvé
 *         content:
 *           application/json:
 *             example:
 *               error: L'utilisateur n'est pas membre de la colocation ou Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur interne du serveur
 */

/**
 * @swagger
 * /api/v1/colocation/{colocationID}/members:
 *   get:
 *     summary: Get colocation members
 *     description: Retrieve a list of members belonging to a specific colocation.
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
 *               data: [
 *                 {
 *                   "id": 1,
 *                   "created_at": "2023-12-21T09:38:19.000Z",
 *                   "updated_at": "2023-12-21T09:38:19.000Z",
 *                   "firstname": "User1",
 *                   "lastname": "Lastname1",
 *                   "email": "user1@example.com",
 *                   "birthday": null,
 *                   "phone": null,
 *                   "pseudo": null,
 *                   "gender": null,
 *                   "avatar": null,
 *                   "colocation_id": "5"
 *                 },
 *                 {
 *                   "id": 2,
 *                   "created_at": "2023-12-21T09:38:19.000Z",
 *                   "updated_at": "2023-12-21T09:38:19.000Z",
 *                   "firstname": "User2",
 *                   "lastname": "Lastname2",
 *                   "email": "user2@example.com",
 *                   "birthday": null,
 *                   "phone": null,
 *                   "pseudo": null,
 *                   "gender": null,
 *                   "avatar": null,
 *                   "colocation_id": "5"
 *                 }
 *               ]
 *       404:
 *         description: Colocation non trouvée
 *         content:
 *           application/json:
 *             example:
 *               error: Colocation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur interne du serveur
 */

