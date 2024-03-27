import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../helpers/constant.js";
import models from "../models/index.js";

const authMiddleware = async (req, res, next) => {
  const tokenHeader = req.header("Authorization");
  const token = tokenHeader?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token not provided" });
  }

  jwt.verify(token, JWT_SECRET_KEY, async (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Unauthorized - Token expired" });
      }

      return res.status(403).json({ error: "Forbidden - Invalid token" });
    }

    // Si le token expire dans moins de 10 minutes, renvoyer un nouveau token
    const now = Math.floor(Date.now() / 1000);
    if (user.exp - now < 600) {
      const newToken = jwt.sign(user, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRED_IN,
      });

      return res.status(200).json({ token: newToken });
    }
    const userDb = (
      await models.user.findByPk(user.id, {
        attributes: { exclude: ["password"] },
      })
    ).toJSON();
    req.user = userDb;
    next();
  });
};

export default authMiddleware;
