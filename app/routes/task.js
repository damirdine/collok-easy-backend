import express from "express";
import tasksController from "../controllers/tasksController.js";
import taskValidator from "../middleware/validations/task.js";
import handleValidationErrors from "../middleware/validations/index.js";

const taskRouter = express.Router();

taskRouter.get(
  "/:colocationId/tasks",
  taskValidator.getTasksByColocation,
  handleValidationErrors,
  tasksController.getTasksByColocation
);
/**
 * @swagger
 * /api/v1/colocation/{colocationId}/tasks:
 *   get:
 *     tags:
 *       - Task
 *     security:
 *       - BearerAuth: []
 *     summary: Retrieve tasks by colocation
 *     description: Retrieve all tasks associated with a specific colocation that the user belongs to.
 *     parameters:
 *       - in: path
 *         name: colocationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the colocation
 *     responses:
 *       200:
 *         description: List of tasks in the specified colocation
 *         content:
 *           application/json:
 *             example:
 *               data: [
 *                 {
 *                   "id": 2,
 *                   "createdAt": "2023-12-22T13:51:50.000Z",
 *                   "updatedAt": "2023-12-22T13:51:50.000Z",
 *                   "estimated_duration": 1,
 *                   "objective_id": 7,
 *                   "objective": {
 *                     "id": 7,
 *                     "createdAt": "2023-12-22T13:51:50.000Z",
 *                     "updatedAt": "2023-12-22T13:51:50.000Z",
 *                     "name": "Objective 7",
 *                     "description": null,
 *                     "deadline": null,
 *                     "colocation_id": 1,
 *                     "created_by": 7,
 *                     "is_completed": false
 *                   }
 *                 },
 *                 {
 *                   "id": 4,
 *                   "createdAt": "2023-12-22T13:51:50.000Z",
 *                   "updatedAt": "2023-12-22T13:51:50.000Z",
 *                   "estimated_duration": 2,
 *                   "objective_id": 9,
 *                   "objective": {
 *                     "id": 9,
 *                     "createdAt": "2023-12-22T13:51:50.000Z",
 *                     "updatedAt": "2023-12-22T13:51:50.000Z",
 *                     "name": "Objective 9",
 *                     "description": null,
 *                     "deadline": null,
 *                     "colocation_id": 1,
 *                     "created_by": 9,
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

taskRouter.get(
  "/:colocationId/tasks/:taskId",
  taskValidator.getTask,
  handleValidationErrors,
  tasksController.getTask
);
/**
 * @swagger
 * /api/v1/colocation/{colocationId}/tasks/{taskId}:
 *   get:
 *     tags:
 *       - Task
 *     security:
 *       - BearerAuth: []
 *     summary: Retrieve a specific task within a colocation
 *     description: Retrieve detailed information about a specific task within a colocation.
 *     parameters:
 *       - in: path
 *         name: colocationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the colocation
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to retrieve
 *     responses:
 *       200:
 *         description: Detailed information about the task
 *         content:
 *           application/json:
 *             example:
 *               data: {
 *                 "id": 2,
 *                 "createdAt": "2023-12-22T13:51:50.000Z",
 *                 "updatedAt": "2023-12-22T13:51:50.000Z",
 *                 "estimated_duration": 1,
 *                 "objective_id": 7,
 *                 "objective": {
 *                   "name": "Objective 7",
 *                   "deadline": null,
 *                   "created_by": 7,
 *                   "is_completed": false,
 *                   "assigned_users": [
 *                     {
 *                       "id": 1,
 *                       "firstname": "User1",
 *                       "lastname": "Lastname1",
 *                       "avatar": null
 *                     },
 *                     {
 *                       "id": 13,
 *                       "firstname": "Elena",
 *                       "lastname": "Doe",
 *                       "avatar": "https://example.com/avatar.jpg"
 *                     }
 *                   ]
 *                 }
 *               }
 *       404:
 *         description: Task not found in this colocation
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

taskRouter.post(
  "/:colocationId/tasks/",
  taskValidator.addTask,
  handleValidationErrors,
  tasksController.addTask
);
/**
 * @swagger
 * /api/v1/colocation/{colocationId}/tasks:
 *   post:
 *     tags:
 *       - Task
 *     security:
 *       - BearerAuth: []
 *     summary: Add a new task to a colocation
 *     description: Add a new task with its related objective to the specified colocation, if the user belongs to that colocation.
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
 *         description: New task successfully created
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

taskRouter.delete(
  "/:colocationId/tasks/:taskId",
  taskValidator.deleteTask,
  handleValidationErrors,
  tasksController.deleteTask
);

/**
 * @swagger
 * /api/v1/colocation/{colocationId}/tasks/{taskId}:
 *   delete:
 *     tags:
 *       - Task
 *     security:
 *       - BearerAuth: []
 *     summary: Delete a specific task within a colocation
 *     description: Deletes a task if the user has the necessary permissions.
 *     parameters:
 *       - in: path
 *         name: colocationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the colocation
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to delete
 *     responses:
 *       200:
 *         description: Task successfully deleted
 *         content:
 *           application/json:
 *             example:
 *               message: "Tâche supprimée avec succès."
 *       404:
 *         description: Task not found
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

taskRouter.put(
  "/:colocationId/tasks/:taskId",
  taskValidator.updateTask,
  handleValidationErrors,
  tasksController.updateTask
);
/**
 * @swagger
 * /api/v1/colocation/{colocationId}/tasks/{taskId}:
 *   put:
 *     tags:
 *       - Task
 *     security:
 *       - BearerAuth: []
 *     summary: Update a specific task within a colocation
 *     description: Update the details of a specific task within a colocation.
 *     parameters:
 *       - in: path
 *         name: colocationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the colocation
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to update
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
 *         description: Task successfully updated
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
 *         description: Task not found
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

taskRouter.post(
  "/:colocationId/tasks/:taskId/assign-user",
  taskValidator.assignUserToTask,
  handleValidationErrors,
  tasksController.assignUserToTask
);
/**
 * @swagger
 * /api/v1/colocation/{colocationId}/tasks/{taskId}/assign-user:
 *   post:
 *     tags:
 *       - Task
 *     security:
 *       - BearerAuth: []
 *     summary: Assign a user to a task within a colocation
 *     description: Assign a specific user to a task within a given colocation, if the user belongs to that colocation.
 *     parameters:
 *       - in: path
 *         name: colocationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the colocation
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to which the user is to be assigned
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
 *         description: User successfully assigned to the task
 *         content:
 *           application/json:
 *             example:
 *               message: "Utilisateur assigné à la tache avec succès."
 *       404:
 *         description: Task not found or user does not belong to the colocation
 *         content:
 *           application/json:
 *             example:
 *               error: "Tâche non trouvée ou ne fait pas partie de cette colocation."
 *       422:
 *         description:  User assigned to the task
 *         content:
 *           application/json:
 *             example:
 *               error: "Utilisateur dèjà assigné à la tâche."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors de l'assignation de l'utilisateur."
 */

taskRouter.delete(
  "/:colocationId/tasks/:taskId/assign-user",
  taskValidator.removeUserFromTask,
  handleValidationErrors,
  tasksController.removeUserFromTask
);
/**
 * @swagger
 * /api/v1/colocation/{colocationId}/tasks/{taskId}/assign-user:
 *   delete:
 *     tags:
 *       - Task
 *     security:
 *       - BearerAuth: []
 *     summary: Remove a user from a task within a colocation
 *     description: Remove a specific user from a task within a given colocation, if the user is currently assigned to that task.
 *     parameters:
 *       - in: path
 *         name: colocationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the colocation
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task from which the user is to be removed
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
 *         description: User successfully removed from the task
 *         content:
 *           application/json:
 *             example:
 *               message: "Utilisateur retiré de la tâche avec succès."
 *       404:
 *         description: Outgoing not found, or user not assigned to the outgoing
 *         content:
 *           application/json:
 *             examples:
 *               notFound:
 *                 value:
 *                   error: "Tache non trouvé."
 *               userNotAssigned:
 *                 value:
 *                   error: "Utilisateur non assigné à la tache."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Erreur lors du retrait de l'utilisateur."
 */

export default taskRouter;
