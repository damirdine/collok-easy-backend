import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../helpers/constant.js";

const authMiddleware = (req, res, next) => {
  const tokenHeader = req.header("Authorization");
  const token = tokenHeader?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token not provided" });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
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

    req.user = user;
    next();
  });
};

export default authMiddleware;
