import express from "express";
import outgoingsController from "../controllers/outgoingsController.js";

const outgoingRouter = express.Router();

outgoingRouter.get(
  "/:colocationId/outgoings",
  outgoingsController.getOutgoingsByColocation
);
outgoingRouter.get(
  "/:colocationId/outgoings/:outgoingId",
  outgoingsController.getOutgoing
);
outgoingRouter.delete(
  "/:colocationId/outgoings/:outgoingId",
  outgoingsController.deleteOutgoing
);
outgoingRouter.post(
  "/:colocationId/outgoings/",
  outgoingsController.addOutgoing
);
outgoingRouter.put(
  "/:colocationId/outgoings/:outgoingId",
  outgoingsController.updateOutgoing
);
outgoingRouter.post(
  "/:colocationId/outgoings/:outgoingId/assign-user",
  outgoingsController.assignUserToOutgoing
);
outgoingRouter.delete(
  "/:colocationId/outgoings/:outgoingId/assign-user",
  outgoingsController.removeUserFromOutgoing
);
/**
 * @swagger
 * /api/v1/colocation/{colocationId}/outgoings:
 *   get:
 *     tags:
 *       - Outgoing
 *     security:
 *       - BearerAuth: []
 *     summary: Retrieve outgoings by colocation
 *     description: Retrieve all outgoings associated with a specific colocation that the user belongs to.
 *     parameters:
 *       - in: path
 *         name: colocationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the colocation
 *     responses:
 *       200:
 *         description: List of outgoings in the specified colocation
 *         content:
 *           application/json:
 *             example:
 *               data: [
 *                 {
 *                   "id": 1,
 *                   "created_at": "2023-12-22T13:51:50.000Z",
 *                   "updated_at": "2023-12-22T13:51:50.000Z",
 *                   "final_expense": 5416,
 *                   "objective_id": 1,
 *                   "objective": {
 *                     "id": 1,
 *                     "created_at": "2023-12-22T13:51:50.000Z",
 *                     "updated_at": "2023-12-22T13:51:50.000Z",
 *                     "name": "Objective 1",
 *                     "description": null,
 *                     "deadline": null,
 *                     "colocation_id": 1,
 *                     "created_by": 1,
 *                     "is_completed": false
 *                   }
 *                 },
 *                 {
 *                   "id": 3,
 *                   "created_at": "2023-12-22T13:51:50.000Z",
 *                   "updated_at": "2023-12-22T13:51:50.000Z",
 *                   "final_expense": 1916,
 *                   "objective_id": 3,
 *                   "objective": {
 *                     "id": 3,
 *                     "created_at": "2023-12-22T13:51:50.000Z",
 *                     "updated_at": "2023-12-22T13:51:50.000Z",
 *                     "name": "Objective 3",
 *                     "description": null,
 *                     "deadline": null,
 *                     "colocation_id": 1,
 *                     "created_by": 3,
 *                     "is_completed": false
 *                   }
 *                 }
 *               ]
 *       403:
 *         description: Access denied to this colocation
 *         content:
 *           application/json:
 *             example:
 *               error: "Accès refusé à cette colocation."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors de la récupération des dépenses."
 */

/**
 * @swagger
 * /api/v1/colocation/{colocationId}/outgoings/{outgoingId}:
 *   get:
 *     tags:
 *       - Outgoing
 *     security:
 *       - BearerAuth: []
 *     summary: Retrieve a specific outgoing within a colocation
 *     description: Retrieve detailed information about a specific outgoing within a colocation.
 *     parameters:
 *       - in: path
 *         name: colocationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the colocation
 *       - in: path
 *         name: outgoingId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the outgoing to retrieve
 *     responses:
 *       200:
 *         description: Detailed information about the outgoing
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 id: 7
 *                 created_at: "2023-12-22T14:20:10.000Z"
 *                 updated_at: "2023-12-22T14:20:10.000Z"
 *                 final_expense: 12003
 *                 objective_id: 20
 *                 objective:
 *                   name: "facture edf"
 *                   deadline: "2023-10-12T00:00:00.000Z"
 *                   created_by: 13
 *                   is_completed: false
 *                   assigned_users:
 *                     - id: 1
 *                       firstname: "User1"
 *                       lastname: "Lastname1"
 *                       avatar: null
 *                 totalExpenseByUser: 2400.6
 *       403:
 *         description: Access denied to this colocation
 *         content:
 *           application/json:
 *             example:
 *               error: "Accès refusé à cette colocation."
 *       404:
 *         description: Outgoing not found in this colocation
 *         content:
 *           application/json:
 *             example:
 *               error: "Dépense non trouvée dans cette colocation."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors de la récupération de la dépense."
 */

/**
 * @swagger
 * /api/v1/colocation/{colocationId}/outgoings:
 *   post:
 *     tags:
 *       - Outgoing
 *     security:
 *       - BearerAuth: []
 *     summary: Create a new outgoing expense.
 *     parameters:
 *       - in: path
 *         name: colocationId
 *         required: true
 *         description: The ID of the colocation.
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             name: "factureau"
 *             description: "Expense description"
 *             deadline: "2023/10/12"
 *             final_expense: 10003
 *     responses:
 *       201:
 *         description: Successful creation of outgoing expense.
 *         content:
 *           application/json:
 *             example:
 *               message: "Dépense créée avec succès."
 *               data:
 *                 id: 23
 *                 final_expense: 10003
 *                 objective:
 *                   id: 47
 *                   name: "factureau"
 *                   deadline: "2023-10-12T00:00:00.000Z"
 *                   is_completed: false
 *                   assigned_users:
 *                     - id: 3
 *                       pseudo: null
 *                       prénom: "User3"
 *                       nom: "Lastname3"
 *                     - id: 5
 *                       pseudo: null
 *                       prénom: "User5"
 *                       nom: "Lastname5"
 *                     - id: 7
 *                       pseudo: null
 *                       prénom: "User7"
 *                       nom: "Lastname7"
 *                     - id: 9
 *                       pseudo: null
 *                       prénom: "User9"
 *                       nom: "Lastname9"
 *                     - id: 41
 *                       pseudo: "elena_doe"
 *                       prénom: "Elena"
 *                       nom: "Doe"
 *                     - id: 42
 *                       pseudo: "elena_doe"
 *                       prénom: "Elena"
 *                       nom: "Doe"
 *       403:
 *         description: Access denied to this colocation
 *         content:
 *           application/json:
 *             example:
 *               error: "Accès refusé à cette colocation."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur interne du serveur."
 */

/**
 * @swagger
 * /api/v1/colocation/{colocationId}/outgoings/{outgoingId}:
 *   delete:
 *     tags:
 *       - Outgoing
 *     security:
 *       - BearerAuth: []
 *     summary: Delete a specific outgoing within a colocation
 *     description: Deletes a outgoing if the user has the necessary permissions.
 *     parameters:
 *       - in: path
 *         name: colocationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the colocation
 *       - in: path
 *         name: outgoingId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the outgoing to delete
 *     responses:
 *       200:
 *         description: Outgoing successfully deleted
 *         content:
 *           application/json:
 *             example:
 *               message: "Dépense supprimée avec succès."
 *       404:
 *         description: Dépense non trouvée.
 *         content:
 *           application/json:
 *             example:
 *               error: "Dépense non trouvée."
 *       403:
 *         description: Permission denied
 *         content:
 *           application/json:
 *             examples:
 *               AccessDenied:
 *                 value:
 *                   error: "Accès refusé à cette colocation."
 *               PermisseDenied:
 *                 value:
 *                   error: "Vous n'avez pas la permission de supprimer cette dépense."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors de la suppression de la dépense."
 */

/**
 * @swagger
 * /api/v1/colocation/{colocationId}/outgoings/{outgoingId}:
 *   put:
 *     tags:
 *       - Outgoing
 *     security:
 *       - BearerAuth: []
 *     summary: Update an outgoing expense.
 *     parameters:
 *       - in: path
 *         name: colocationId
 *         required: true
 *         description: The ID of the colocation.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: outgoingId
 *         required: true
 *         description: The ID of the outgoing expense.
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             is_completed: true
 *             description: "facture de mois de janvier"
 *             final_expense: 2897
 *             deadline: "2023/01/05 15:30"
 *     responses:
 *       200:
 *         description: Successful update of outgoing expense.
 *         content:
 *           application/json:
 *             example:
 *               message: "Dépense mise à jour avec succès."
 *               data:
 *                 id: 27
 *                 created_at: "2024-01-12T10:42:11.000Z"
 *                 updated_at: "2024-01-12T11:11:49.000Z"
 *                 final_expense: 2897
 *                 objective_id: 52
 *                 objective:
 *                   id: 52
 *                   created_at: "2024-01-12T10:42:11.000Z"
 *                   updated_at: "2024-01-12T11:11:49.000Z"
 *                   name: "facture eau"
 *                   description: "facture de mois de janvier"
 *                   deadline: "2023-01-05T15:30:00.000Z"
 *                   colocation_id: 1
 *                   created_by: 42
 *                   is_completed: true
 *       403:
 *         description: Forbidden. User does not have permission to update the outgoing.
 *         content:
 *           application/json:
 *             example:
 *               error: "Vous n'avez pas la permission de modifier cette dépense."
 *       404:
 *         description: Outgoing expense not found or user not allowed to update.
 *         content:
 *           application/json:
 *             example:
 *               error: "Dépense non trouvée ou utilisateur non autorisé à la mise à jour."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur interne du serveur."
 */

/**
 * @swagger
 * /api/v1/colocation/{colocationId}/outgoings/{outgoingId}/assign-user:
 *   post:
 *     tags:
 *       - Outgoing
 *     security:
 *       - BearerAuth: []
 *     summary: Assign a user to a outgoing within a colocation
 *     description: Assign a specific user to a outgoing within a given colocation, if the user belongs to that colocation.
 *     parameters:
 *       - in: path
 *         name: colocationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the colocation
 *       - in: path
 *         name: outgoingId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the outgoing to which the user is to be assigned
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 12
 *     responses:
 *       200:
 *         description: User successfully assigned to the outgoing
 *         content:
 *           application/json:
 *             example:
 *               message: "Utilisateur assigné à la dépense avec succès."
 *               data:
 *                 id: 1
 *                 created_at: "2024-01-12T15:11:04.000Z"
 *                 updated_at: "2024-01-12T15:11:04.000Z"
 *                 final_expense: 2002
 *                 objective_id: 6
 *                 objective:
 *                   id: 6
 *                   created_at: "2024-01-12T15:11:04.000Z"
 *                   updated_at: "2024-01-12T15:11:04.000Z"
 *                   name: "Objective 6"
 *                   description: null
 *                   deadline: null
 *                   colocation_id: 2
 *                   created_by: 6
 *                   is_completed: false
 *                   assigned_users:
 *                     - id: 6
 *                       pseudo: null
 *                       firstname: "User6"
 *                       lastname: "Lastname6"
 *                       email: "user6@example.com"
 *                       user_objective:
 *                         created_at: "2024-01-29T09:53:46.000Z"
 *                         updated_at: "2024-01-29T09:53:46.000Z"
 *                         objective_id: 6
 *                         user_id: 12
 *       404:
 *         description: Outgoing not found or user does not belong to the colocation
 *         content:
 *           application/json:
 *             example:
 *               error: "Dépense ou utilisateur non trouvée ou ne fait pas partie de cette colocation."
 *       422:
 *         description: Outgoing assigned to the colocation
 *         content:
 *           application/json:
 *             example:
 *               error: "Utilisateur déjà assigné à la dépense."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors de l'assignation de l'utilisateur."
 */

/**
 * @swagger
 * /api/v1/colocation/{colocationId}/outgoings/{outgoingId}/assign-user:
 *   delete:
 *     tags:
 *       - Outgoing
 *     security:
 *       - BearerAuth: []
 *     summary: Remove a user from a outgoing within a colocation
 *     description: Remove a specific user from a outgoing within a given colocation, if the user is currently assigned to that outgoing.
 *     parameters:
 *       - in: path
 *         name: colocationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the colocation
 *       - in: path
 *         name: outgoingId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the outgoing from which the user is to be removed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 12
 *     responses:
 *       200:
 *         description: User successfully removed from the outgoing
 *         content:
 *           application/json:
 *             example:
 *               message: "Utilisateur retiré de la dépense avec succès."
 *       404:
 *         description: Outgoing not found, or user not assigned to the outgoing
 *         content:
 *           application/json:
 *             examples:
 *               notFound:
 *                 value:
 *                   error: "Dépense ou objectif non trouvé."
 *               userNotAssigned:
 *                 value:
 *                   error: "Utilisateur non assigné à la dépense."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors du retrait de l'utilisateur"
 */

export { outgoingRouter };
