import models from "../models/index.js";

const userController = {
  async getAll(req, res) {
    try {
      const users = await models.user.findAll();
      res.json({ data: users });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erreur serveur" });
    }
  },
  async editProfile(req, res) {
    try {
      const userId = req?.user?.id; // Assuming you have user ID in the request
      // Fetch the user from the database
      const user = await models.user.findByPk(userId);

      
      if (!user) {
        throw new Error("User not found.");
      }

      const { password, ...body } = req.body;
      const { pseudo } = req.body; 
      const { email } = req.body;

      if (pseudo) {
        const existingPseudo = await models.user.findOne({
          where: { pseudo },
        });
    
        if (existingPseudo) {
          return res.status(422).json({ error: "Le Pseudo doit être unique." });
        }
      }

      if (email) {
        const existingEmail = await models.user.findOne({
          where: { email },
        });
    
        if (existingEmail) {
          return res.status(422).json({ error: "Cet email est déjà utilisé." });
        }
      }
      
      await user.update({ ...body, updateAt: new Date() });
      const { password: psw, ...userData } = user.toJSON();
      res.json({ message: "Profile updated successfully", data: userData });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erreur serveur" });
    }
  },

  async deleteProfile(req, res) {
    try {
      const userIdToDelete = req.user.id;
      const userToDelete = await models.user.findByPk(userIdToDelete);

      if (!userToDelete) {
        throw new Error("User not found.");
      }
      await userToDelete.destroy();

      res.json({ message: "Profile deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erreur serveur" });
    }
  },
  async me(req, res) {
    try {
      const foundUser = await models.user.findByPk(req?.user?.id || 1);
      if (!foundUser) {
        throw new Error("User not found.");
      }
      const { password, ...data } = foundUser.toJSON();
      return res.json({ data });
    } catch (error) {
      const notFound = error.message.includes("not found");
      console.error(error);
      return res.status(notFound ? 404 : 500).json({
        error: notFound ? error.message : "Internal Server Error",
      });
    }
  },
  async isExist(req, res) {
    try {
      const user = models.user.findOne({
        where: {
          [models.sequelize.Op.or]: [
            { email: req.body?.email },
            { pseudo: req.body?.nickname ?? req.body?.pseudo },
          ],
        },
      });

      const { password: psw, ...userData } = user.toJSON();
      res.json({ data: userData });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erreur serveur" });
    }
  },
};
export default userController;
