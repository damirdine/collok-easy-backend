import models from "../models/index.js";

const colocationController = {
  async getColocations(req, res) {
    try {
      const data = await models.colocation.findAll({
        include: [
          {
            model: models.user,
            as: 'admin_user',
            attributes: ['id', 'firstname', 'lastname', 'pseudo'],
          },
        ],
      });
  
      if (data.length > 0) {
        res.json({ data });
      } else {
        res.json({ message: "Aucune colocation trouvée." });
      }
  
    } catch (error) {
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },  

  async getColocationById(req, res) {
    const { colocationID } = req.params;
          // TODO Rajouter vérification si l'utilisateur fait bien partie de la colcoation ?
    try {
      const data = await models.colocation.findByPk(colocationID);
      if (data) {
        res.json({ data });
      } else {
        res.status(404).json({ error: "Colocation non trouvée" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  async createColocation(req, res) {
    const { name } = req.body; 
    try {
      const data = await models.colocation.create({
        name,
        admin_user_id: req.user.id,
      });
      await data.reload();
      res.status(201).json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  async updateColocationName(req, res) {
    const { colocationID } = req.params;
    const { name } = req.body;
    const idCurrentUser = req.user.id;
    try {
      const data = await models.colocation.findByPk(colocationID);
      if (data) {
        const idAdmin =  data.dataValues.admin_user_id;
        if (idAdmin === idCurrentUser) {
          await data.update({ name: name });
          await data.reload();
          res.json({ data });
        } else {
          res.status(403).json({ error: "Utilisateur non autorisé" });
        }
      } else {
        res.status(404).json({ error: "Colocation non trouvée" });
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  async getColocationAdmin(req, res) {
    const { colocationID } = req.params;

    try {
      const data = await models.user.findByPk(colocationID);

      if (data) {
        res.json({ data });
      } else {
        res.status(404).json({ error: "Colocation non trouvée pour l'utilisateur admin" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  async updateColocationAdmin(req, res) {
    const { colocationID } = req.params;
    const { newAdminID } = req.body;
    const idCurrentUser = req.user.id;
    try {
      const data = await models.colocation.findByPk(colocationID);
      
      if (data) {
        const idAdmin = data.colocation.dataValues.admin_user_id;
        if (idAdmin === idCurrentUser) {
          await data.update({ admin_user_id: newAdminID });
          await data.reload();
          res.json({ data });
        } else {
          res.status(403).json({ error: "Utilisateur non autorisé" });
        }
      } else {
        res.status(404).json({ error: "Colocation non trouvée" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  async addColocationMember(req, res) {
    const { colocationID } = req.params;
    const { user_id } = req.body;
    const idCurrentUser = req.user.id;

    try {
      const data = await models.user.findByPk(user_id);
      const colocation = await models.colocation.findByPk(colocationID);
      if (data) {
        if (colocation) {
          const idAdmin = colocation.dataValues.admin_user_id;
          if (idCurrentUser === idAdmin) {
            if (data.dataValues.colocation_id !== colocationID) {
              await data.update({
                colocation_id: colocationID,
              });
              await data.reload();
              res.json({ data });
            } else {
              res.json({ message: "L'utilisateur est déjà membre de la colocation." });
            }
          } else {
            res.status(403).json({ error : "Utilisateur non autorisé" });
          }
        }
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  async deleteColocationMember(req, res) {
    const { colocationID } = req.params;
    const { user_id } = req.body;
    const idCurrentUser = req.user.id;
    try {
      const user = await models.user.findByPk(user_id);
      const userData = user.dataValues;
      const colocation = await models.colocation.findByPk(colocationID);
      
      if (userData) {
        if (colocation) {
          const idAdmin = colocation.dataValues.admin_user_id;
          if (idCurrentUser === idAdmin) {
            if (userData.colocation_id && userData.colocation_id == colocationID) {
              await user.update({ colocation_id: null });
              res.json({
                data: {
                  message: "Utilisateur retiré de la colocation avec succès.",
                },
              });
            } else {
              res
                .status(404)
                .json({ error: "L'utilisateur n'est pas membre de la colocation." });
            }
          } else {
            res.status(403).json({ error : "Utilisateur non autorisé" });
          }
        }
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  async getColocationMembers(req, res) {
    const { colocationID } = req.params;
    try {
        const colocation = await models.colocation.findByPk(colocationID, {
            include: {
                model: models.user,
            },
        });
        if (colocation) {
            const members = colocation.users;
            res.json({ members });
        } else {
            res.status(404).json({ error: "Colocation non trouvée" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
},
};

export default colocationController;
