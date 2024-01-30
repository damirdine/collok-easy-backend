import models from "../models/index.js";
import { translate } from "../helpers/translate.js";
import AuthError, { handleRequestExeption } from "../exceptions/authErrors.js";

const { errors, msg } = translate();

const userController = {
  async getAll(req, res) {
    try {
      const users = await models.user.findAll({
        attributes: { exclude: ["password"] },
      });
      res.json({ data: users });
    } catch (error) {
      handleRequestExeption(error, res);
    }
  },
  async editProfile(req, res) {
    try {
      const userId = req?.user?.id; // Assuming you have user ID in the request
      // Fetch the user from the database
      const user = await models.user.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        throw new AuthError(errors.user_not_found, 400);
      }

      const { pseudo, email } = req.body;
      if (pseudo) {
        const existingPseudo = await models.user.findOne({
          where: { pseudo },
        });

        if (existingPseudo) {
          throw new AuthError(errors.pseudo_already_used, 422);
        }
      }

      if (email) {
        const existingEmail = await models.user.findOne({
          attributes: { exclude: ["password"] },
          where: { email },
        });

        if (existingEmail) {
          throw new AuthError(errors.email_already_used, 422);
        }
      }

      const { password, ...body } = req.body;
      await user.update({ ...body, updateAt: new Date() });

      res.json({
        message: msg.success_profile_update,
        data: await user.reload(),
      });
    } catch (error) {
      return handleRequestExeption(error, req);
    }
  },

  async deleteProfile(req, res) {
    try {
      const userIdToDelete = req.user.id;
      const userToDelete = await models.user.findByPk(userIdToDelete);

      if (!userToDelete) {
        throw new AuthError(errors.user_not_found, 404);
      }
      await userToDelete.destroy();

      res.json({ message: msg.success_profile_delete });
    } catch (error) {
      handleRequestExeption(error, res);
    }
  },
  async me(req, res) {
    try {
      const foundUser = await models.user.findByPk(req?.user?.id || 1, {
        attributes: { exclude: ["password"] },
      });
      if (!foundUser) {
        throw new AuthError(errors.user_not_found, 404);
      }
      return res.json({ data: foundUser.toJSON() });
    } catch (error) {
      handleRequestExeption(error, res);
    }
  },
  async isExist(req, res) {
    try {
      const user = models.user.findOne({
        attributes: { exclude: ["password"] },
        where: {
          [models.sequelize.Op.or]: [
            { email: req.body?.email },
            { pseudo: req.body?.nickname || req.body?.pseudo },
          ],
        },
      });

      res.json({ data: user.toJSON() });
    } catch (error) {
      handleRequestExeption(error, res);
    }
  },
};
export default userController;
