import models from "../models/index.js";

const colocationController = {
  async getColocations(req, res) {
    try {
      const data = await models.colocation.findAll();
      res.json({ data });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getColocationById(req, res) {
    const { colocationID } = req.params;
    try {
      const data = await models.colocation.findByPk(colocationID);
      if (data) {
        res.json({ data });
      } else {
        res.status(404).json({ error: "Colocation not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createColocation(req, res) {
    const { name, admin_user_id } = req.body;

    try {
      const data = await models.colocation.create({
        name,
        admin_user_id,
      });
      await data.reload();
      res.status(201).json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async updateColocationName(req, res) {
    const { colocationID } = req.params;
    const { name } = req.body;

    try {
      const data = await models.colocation.findByPk(colocationID);

      if (data) {
        await data.update({ name: name });
        await data.reload();
        res.json({ data });
      } else {
        res.status(404).json({ error: "Colocation not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getColocationAdmin(req, res) {
    const { colocationID } = req.params;

    try {
      const data = await models.colocation.findByPk(colocationID);

      if (data) {
        res.json({ data });
      } else {
        res.status(404).json({ error: "Colocation not found for admin user" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async updateColocationAdmin(req, res) {
    const { colocationID } = req.params;
    const { newAdminID } = req.body;

    try {
      const data = await models.colocation.findByPk(colocationID);
      if (data) {
        await data.update({ admin_user_id: newAdminID });
        await data.reload();
        res.json({ data });
      } else {
        res.status(404).json({ error: "Colocation not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async addColocationMember(req, res) {
    const { colocationID } = req.params;
    const { user_id } = req.body;

    try {
      const data = await models.user.findByPk(user_id);

      if (data) {
        if (data.colocation_id !== colocationID) {
          await data.update({
            colocation_id: colocationID,
          });
          await data.reload();
          res.json({ data });
        } else {
          res.json({ message: "User is already a member of the colocation." });
        }
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteColocationMember(req, res) {
    const { colocationID } = req.params;
    const { user_id } = req.body;
    try {
      const user = await models.user.findByPk(user_id);
      const userData = user.dataValues;

      if (userData) {
        if (userData.colocation_id && userData.colocation_id == colocationID) {
          await user.update({ colocation_id: null });
          res.json({
            data: {
              message: "User removed from the colocation successfully.",
            },
          });
        } else {
          res
            .status(404)
            .json({ error: "User is not a member of the colocation." });
        }
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default colocationController;
