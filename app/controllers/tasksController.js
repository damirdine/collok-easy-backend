import db from "../models/index.js";
const { sequelize, task, objective } = db;

const tasksController = {
  async getTasksByColocation(req, res) {
    try {
      // Extracting colocation ID and user ID from request
      const colocationId = req.params.colocationId;
      const userId = req.user.id; //from token
      const tasks = await task.findAll({
        include: [
          {
            model: objective,
            where: { colocation_id: colocationId },
            required: true,
          },
        ],
      });
      // Check if the user belongs to the specified colocation
      const userColocation = await db.user.findOne({
        where: { id: userId, colocation_id: colocationId },
      });
      // If user does not belong to the colocation, return an access denied error
      if (!userColocation) {
        return res
          .status(403)
          .send({ error: "Accès refusé à cette colocation." });
      }
      // Respond with the fetched tasks
      res.status(200).json({ data: tasks });
    } catch (error) {
      // Handle any errors during the process
      res
        .status(500)
        .send({ error: "Erreur lors de la récupération des tâches." });
    }
  },

  async getTask(req, res) {
    try {
      const { taskId, colocationId } = req.params;

      const taskInstance = await db.task.findOne({
        where: { id: taskId },
        include: [
          {
            model: db.objective,
            as: "objective",
            attributes: ["name", "deadline", "created_by", "is_completed"],
            required: true,
            include: [
              {
                model: db.user,
                as: "assigned_users",
                through: { attributes: [] },
                attributes: ["id", "firstname", "lastname", "avatar"],
              },
            ],
            where: { colocation_id: colocationId },
          },
        ],
      });

      if (!taskInstance) {
        return res
          .status(404)
          .send({ error: "Tâche non trouvée dans cette colocation." });
      }

      res.status(200).json({ data: taskInstance });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la récupération de la tâche." });
    }
  },
  async addTask(req, res) {
    try {
      // Extract colocationId and userId from the request
      const colocationId = req.params.colocationId;
      const userId = req.user.id; // Obtained from authentication middleware
      // Destructure task details from request body
      const { name, description, deadline, estimated_duration } = req.body;
      // Check if the user belongs to the colocation
      const userColocation = await db.user.findOne({
        where: { id: userId, colocation_id: colocationId },
      });
      // Deny access if user is not part of the colocation
      if (!userColocation) {
        return res
          .status(403)
          .send({ error: "Accès refusé à cette colocation." });
      }
      // Create a new objective in the colocation
      const newObjective = await db.objective.create({
        name,
        description,
        deadline,
        colocation_id: colocationId,
        created_by: userId,
        is_completed: false, // default value at creation
      });

      // Create a task associated with the new objective
      const newTask = await db.task.create({
        estimated_duration,
        objective_id: newObjective.id,
      });

      // Respond with the newly created task instance
      res.status(201).json({
        id: newTask.id,
        estimated_duration: newTask.estimated_duration,
        objective: {
          id: newObjective.id,
          name: newObjective.name,
          deadline: newObjective.deadline,
          is_completed: newObjective.is_completed,
          assigned_users: [], // initially an empty array
        },
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la création de la tâche." });
    }
  },

  async deleteTask(req, res) {
    try {
      const { taskId, colocationId } = req.params;
      const userId = req.user.id;

      // Find the task
      const task = await db.task.findOne({
        where: { id: taskId },
        include: [
          {
            model: db.objective,
            as: "objective",
            where: {
              colocation_id: colocationId,
            },
          },
        ],
      });

      // Check if the task was found and if the user has permission to delete
      if (!task) {
        return res.status(404).send({ error: "Tâche non trouvée." });
      }

      if (task.objective.created_by !== userId) {
        return res.status(403).send({
          error: "Vous n'avez pas la permission de supprimer cette tâche.",
        });
      }

      // Delete the task
      await task.destroy();
      res.status(200).send({ message: "Tâche supprimée avec succès." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la suppression de la tâche." });
    }
  },

  async updateTask(req, res) {
    try {
      // Extract task and colocation IDs from the request parameters
      const { taskId, colocationId } = req.params;
      const updateData = req.body; // Data to update
      // Find the task associated with the given ID and colocation
      const task = await db.task.findOne({
        where: { id: taskId },
        include: [
          {
            model: db.objective,
            as: "objective",
            where: { colocation_id: colocationId },
          },
        ],
      });
      // If the task is not found, return a 404 error
      if (!task) {
        return res.status(404).send({ error: "Tâche non trouvée." });
      }
      // Update the objective if necessary
      if (
        updateData.is_completed !== undefined ||
        updateData.name !== undefined ||
        updateData.description !== undefined ||
        updateData.deadline !== undefined
      ) {
        const objectiveUpdate = {};
        if (updateData.is_completed !== undefined)
          objectiveUpdate.is_completed = updateData.is_completed;
        if (updateData.name !== undefined)
          objectiveUpdate.name = updateData.name;
        if (updateData.description !== undefined)
          objectiveUpdate.description = updateData.description;
        if (updateData.deadline !== undefined)
          objectiveUpdate.deadline = updateData.deadline;

        await task.objective.update(objectiveUpdate);
      }
      // Check if the task needs to be updated
      if (updateData.estimated_duration !== undefined) {
        // Update the task
        await task.update({
          estimated_duration: updateData.estimated_duration,
        });
      }
      res
        .status(200)
        .send({ message: "Tâche mise à jour avec succès.", data: task });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la mise à jour de la tâche." });
    }
  },

  async assignUserToTask(req, res) {
    try {
      const { taskId, colocationId } = req.params;
      const { userId } = req.body;

      const task = await db.task.findByPk(taskId, {
        include: [
          {
            model: db.objective,
            as: "objective",
            where: { colocation_id: colocationId },
            include: [
              {
                model: db.user,
                as: "assigned_users",
              },
            ],
          },
        ],
      });

      const isUserAssigned = task.objective.assigned_users.some(
        (user) => user.id === userId
      );
      if (isUserAssigned) {
        return res
          .status(422)
          .send({ error: "Utilisateur dèjà assigné à la tâche." });
      }
      if (!task) {
        return res.status(404).send({
          error: "Tâche non trouvée ou ne fait pas partie de cette colocation.",
        });
      }

      const user = await db.user.findOne({
        where: { id: userId, colocation_id: colocationId },
      });
      if (!user) {
        return res.status(404).send({
          error: "Utilisateur non trouvé ou n'appartient pas à la colocation.",
        });
      }

      await task.objective.addAssigned_users(user);
      res
        .status(200)
        .send({ message: "Utilisateur assigné à la tache avec succès." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: "Erreur lors de l'assignation de l'utilisateur." });
    }
  },
  async removeUserFromTask(req, res) {
    try {
      const { taskId, colocationId } = req.params;
      const { userId } = req.body;

      const task = await db.task.findByPk(taskId, {
        include: [
          {
            model: db.objective,
            as: "objective",
            where: { colocation_id: colocationId },
            include: [
              {
                model: db.user,
                as: "assigned_users",
              },
            ],
          },
        ],
      });

      if (!task || !task.objective) {
        return res.status(404).send({ error: "Tâche ou objectif non trouvé." });
      }

      const isUserAssigned = task.objective.assigned_users.some(
        (user) => user.id === userId
      );
      if (!isUserAssigned) {
        return res
          .status(404)
          .send({ error: "Utilisateur non assigné à la tâche." });
      }

      await task.objective.removeAssigned_users(userId);
      res
        .status(200)
        .send({ message: "Utilisateur retiré de la tâche avec succès." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: "Erreur lors du retrait de l'utilisateur." });
    }
  },
};

export default tasksController;
