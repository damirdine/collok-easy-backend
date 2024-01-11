import db from "../models/index.js";
const { sequelize, outgoing, objective } = db;

const outgoingsController = {
  async getOutgoingsByColocation(req, res) {
    try {
      // Extracting colocation ID and user ID from request
      const colocationId = req.params.colocationId;
      const userId = req.user.id; //from token
      const outgoings = await outgoing.findAll({
        include: [
          {
            model: objective,
            where: { colocation_id: colocationId },
            required: true,
            include: [
              {
                model: db.user,
                as: "assigned_users",
                through: { attributes: [] },
                attributes: ["id", "firstname", "lastname", "avatar"],
              },
            ],
          },
        ],
      });
      // Respond with the fetched outgoings
      res.status(200).json({ data: outgoings });
    } catch (error) {
      // Handle any errors during the process
      console.log(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la récupération des dépenses." });
    }
  },

  async getOutgoing(req, res) {
    try {
      const { outgoingId, colocationId } = req.params;
      const userId = req.user.id;

      const outgoingInstance = await db.outgoing.findOne({
        where: { id: outgoingId },
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

      if (!outgoingInstance) {
        return res
          .status(404)
          .send({ error: "Dépense non trouvée dans cette colocation." });
      }

      // Vérifier si l'utilisateur connecté participe à la tâche
      const isUserAssigned = outgoingInstance.objective.assigned_users.some(
        (user) => user.id === userId
      );

      // Calculer la somme finale par utilisateur si l'utilisateur participe, sinon retourner le à zéro
      const totalExpenseByUser = isUserAssigned
        ? outgoingInstance.final_expense /
          outgoingInstance.objective.assigned_users.length
        : 0;

      // Ajouter la somme finale par utilisateur à la réponse
      const response = {
        data: outgoingInstance,
        totalExpenseByUser: totalExpenseByUser,
      };

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la récupération de la dépense." });
    }
  },

  async addOutgoing(req, res) {
    try {
      const colocationId = req.params.colocationId;
      const userId = req.user.id;
      const { name, description, deadline, final_expense } = req.body; // Assurez-vous que final_expense est fourni

      const newObjective = await db.objective.create({
        name,
        description,
        deadline,
        colocation_id: colocationId,
        created_by: userId,
        is_completed: false,
      });

      const newOutgoing = await db.outgoing.create({
        final_expense,
        objective_id: newObjective.id,
      });

      const usersInColocation = await db.user.findAll({
        where: { colocation_id: colocationId },
      });

      await newObjective.addAssigned_users(
        usersInColocation.map((user) => user.id)
      );

      res.status(201).json({
        id: newOutgoing.id,
        final_expense: newOutgoing.final_expense,
        objective: {
          id: newObjective.id,
          name: newObjective.name,
          description: newObjective.description,
          deadline: newObjective.deadline,
          is_completed: newObjective.is_completed,
          assigned_users: usersInColocation.map((user) => user.id),
        },
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la création de la dépense." });
    }
  },

  async deleteOutgoing(req, res) {
    try {
      const { outgoingId, colocationId } = req.params;
      const userId = req.user.id;

      // Find the outgoing
      const outgoing = await db.outgoing.findOne({
        where: { id: outgoingId },
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

      // Check if the outgoing was found and if the user has permission to delete
      if (!outgoing) {
        return res.status(404).send({ error: "Dépense non trouvée." });
      }

      if (outgoing.objective.created_by !== userId) {
        return res.status(403).send({
          error: "Vous n'avez pas la permission de supprimer cette dépense.",
        });
      }

      // Delete the outgoing
      await outgoing.destroy();
      res.status(200).send({ data: "Dépense supprimée avec succès." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la suppression de la dépense." });
    }
  },

  async updateOutgoing(req, res) {
    try {
      // Extract outgoing and colocation IDs from the request parameters
      const { outgoingId, colocationId } = req.params;
      const updateData = req.body; // Data to update
      const userId = req.user.id;
      // Find the outgoing associated with the given ID and colocation
      const outgoing = await db.outgoing.findOne({
        where: { id: outgoingId },
        include: [
          {
            model: db.objective,
            as: "objective",
            where: { colocation_id: colocationId },
          },
        ],
      });
      // If the outgoing is not found, return a 404 error
      if (!outgoing) {
        return res.status(404).send({ error: "Dépense non trouvée." });
      }
      if (outgoing.objective.created_by !== userId) {
        return res.status(403).send({
          error: "Vous n'avez pas la permission de modifier cette dépense.",
        });
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

        await outgoing.objective.update(objectiveUpdate);
      }
      // Check if the outgoing needs to be updated
      if (updateData.final_expense !== undefined) {
        // Update the outgoing
        await outgoing.update({
          final_expense: updateData.final_expense,
        });
      }
      res.status(200).send({ data: "Dépense mise à jour avec succès." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la mise à jour de la dépense." });
    }
  },

  async assignUserToOutgoing(req, res) {
    try {
      const { outgoingId, colocationId } = req.params;
      const { userId } = req.body;

      const outgoing = await db.outgoing.findByPk(outgoingId, {
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

      const user = await db.user.findOne({
        where: { id: userId, colocation_id: colocationId },
      });
      if (!outgoing || !user) {
        return res.status(404).send({
          error:
            "Dépense ou utilisateur non trouvé ou ne fait pas partie de cette colocation.",
        });
      }
      const isUserAssigned = outgoing.objective.assigned_users.some(
        (user) => user.id === userId
      );
      if (isUserAssigned) {
        return res
          .status(422)
          .send({ error: "Utilisateur déjà assigné à la dépense." });
      }

      await outgoing.objective.addAssigned_users(user);
      res
        .status(200)
        .send({ data: "Utilisateur assigné à la dépense avec succès." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: "Erreur lors de l'assignation de l'utilisateur." });
    }
  },
  async removeUserFromOutgoing(req, res) {
    try {
      const { outgoingId, colocationId } = req.params;
      const { userId } = req.body;

      const outgoing = await db.outgoing.findByPk(outgoingId, {
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

      if (!outgoing || !outgoing.objective) {
        return res
          .status(404)
          .send({ error: "Dépense ou objectif non trouvé." });
      }

      const isUserAssigned = outgoing.objective.assigned_users.some(
        (user) => user.id === userId
      );
      if (!isUserAssigned) {
        return res
          .status(404)
          .send({ error: "Utilisateur non assigné à la dépense." });
      }

      await outgoing.objective.removeAssigned_users(userId);
      res
        .status(200)
        .send({ data: "Utilisateur retiré de la dépense avec succès." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: "Erreur lors du retrait de l'utilisateur." });
    }
  },
};

export default outgoingsController;
