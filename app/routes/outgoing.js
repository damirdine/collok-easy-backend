import express from "express";
import outgoingsController from "../controllers/outgoingsController.js";

const outgoingRouter = express.Router();

outgoingRouter.get(
  "/:colocationId/outgoings",
  outgoingsController.getOutgoingsByColocation
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
 *                   "createdAt": "2023-12-22T13:51:50.000Z",
 *                   "updatedAt": "2023-12-22T13:51:50.000Z",
 *                   "final_expense": 5416,
 *                   "objective_id": 1,
 *                   "objective": {
 *                     "id": 1,
 *                     "createdAt": "2023-12-22T13:51:50.000Z",
 *                     "updatedAt": "2023-12-22T13:51:50.000Z",
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
 *                   "createdAt": "2023-12-22T13:51:50.000Z",
 *                   "updatedAt": "2023-12-22T13:51:50.000Z",
 *                   "final_expense": 1916,
 *                   "objective_id": 3,
 *                   "objective": {
 *                     "id": 3,
 *                     "createdAt": "2023-12-22T13:51:50.000Z",
 *                     "updatedAt": "2023-12-22T13:51:50.000Z",
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
 *               error: "Erreur lors de la récupération des tâches."
 */

outgoingRouter.get(
  "/:colocationId/outgoings/:outgoingId",
  outgoingsController.getOutgoing
);
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
 *                 createdAt: "2023-12-22T14:20:10.000Z"
 *                 updatedAt: "2023-12-22T14:20:10.000Z"
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
 *       404:
 *         description: Outgoing not found in this colocation
 *         content:
 *           application/json:
 *             example:
 *               error: "Tâche non trouvée dans cette colocation."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors de la récupération de la tâche."
 */

outgoingRouter.post(
  "/:colocationId/outgoings/",
  outgoingsController.addOutgoing
);
/**
 * @swagger
 * /api/v1/colocation/{colocationId}/outgoings:
 *   post:
 *     tags:
 *       - Outgoing
 *     security:
 *       - BearerAuth: []
 *     summary: Add a new outgoing to a colocation
 *     description: Add a new outgoing with its related objective to the specified colocation, if the user belongs to that colocation.
 *     parameters:
 *       - in: path
 *         name: colocationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the colocation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estimated_duration:
 *                 type: integer
 *                 example: 10
 *               name:
 *                 type: string
 *                 example: "salle de bain"
 *               description:
 *                 type: string
 *                 example: "nettoyer le sol"
 *               deadline:
 *                 type: string
 *                 format: date
 *                 example: "2023/10/12"
 *     responses:
 *       201:
 *         description: New outgoing successfully created
 *         content:
 *           application/json:
 *             example:
 *               id: 2
 *               estimated_duration: 10
 *               objective:
 *                 id: 7
 *                 name: "salle de bain"
 *                 deadline: "2023-10-12"
 *                 is_completed: false
 *                 assigned_users: []
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
 *               error: "Erreur lors de la création de la tâche."
 */

outgoingRouter.delete(
  "/:colocationId/outgoings/:outgoingId",
  outgoingsController.deleteOutgoing
);

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
 *               message: "Tâche supprimée avec succès."
 *       404:
 *         description: Outgoing not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Tâche non trouvée."
 *       403:
 *         description: Permission denied
 *         content:
 *           application/json:
 *             example:
 *               error: "Vous n'avez pas la permission de supprimer cette tâche."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors de la suppression de la tâche."
 */

outgoingRouter.put(
  "/:colocationId/outgoings/:outgoingId",
  outgoingsController.updateOutgoing
);
/**
 * @swagger
 * /api/v1/colocation/{colocationId}/outgoings/{outgoingId}:
 *   put:
 *     tags:
 *       - Outgoing
 *     security:
 *       - BearerAuth: []
 *     summary: Update a specific outgoing within a colocation
 *     description: Update the details of a specific outgoing within a colocation.
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
 *         description: The ID of the outgoing to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_completed:
 *                 type: boolean
 *                 example: true
 *               name:
 *                 type: string
 *                 example: "salle de bain"
 *               estimated_duration:
 *                 type: integer
 *                 example: 10
 *               deadline:
 *                 type: string
 *                 format: datetime
 *                 example: "2023/10/12 15:00"
 *     responses:
 *       200:
 *         description: Outgoing successfully updated
 *         content:
 *           application/json:
 *             example:
 *               message: "Tâche mise à jour avec succès."
 *               data:
 *                 id: 4
 *                 createdAt: "2023-12-21T09:56:07.000Z"
 *                 updatedAt: "2023-12-22T08:41:14.000Z"
 *                 estimated_duration: 10
 *                 objective_id: 9
 *                 objective:
 *                   id: 9
 *                   createdAt: "2023-12-21T09:56:07.000Z"
 *                   updatedAt: "2023-12-22T08:41:14.000Z"
 *                   name: "salle de bain"
 *                   deadline: "2023-10-12T15:00:00.000Z"
 *                   is_completed: true
 *       404:
 *         description: Outgoing not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Tâche non trouvée."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors de la mise à jour de la tâche."
 */

outgoingRouter.post(
  "/:colocationId/outgoings/:outgoingId/assign-user",
  outgoingsController.assignUserToOutgoing
);
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
 *               message: "Utilisateur assigné à la tache avec succès."
 *       404:
 *         description: Outgoing not found or user does not belong to the colocation
 *         content:
 *           application/json:
 *             example:
 *               error: "Tâche non trouvée ou ne fait pas partie de cette colocation."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors de l'assignation de l'utilisateur."
 */

outgoingRouter.delete(
  "/:colocationId/outgoings/:outgoingId/assign-user",
  outgoingsController.removeUserFromOutgoing
);
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
 *               message: "Utilisateur retiré de la tâche avec succès."
 *       404:
 *         description: Outgoing not found or user not assigned to the outgoing
 *         content:
 *           application/json:
 *             example:
 *               error: "Tâche ou objectif non trouvé."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors du retrait de l'utilisateur."
 */

export default outgoingRouter;
