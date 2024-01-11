import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import models from "../models/index.js";
import {
  JWT_EXPIRED_IN,
  JWT_SECRET_KEY,
  REFRESH_TOKEN_EXPIRED_IN,
} from "../helpers/constant.js";
import { sendEmail } from "../helpers/email.js";
import { render } from "../helpers/template.js";
const authController = (models) => ({
  async register(req, res) {
    try {
      const body = req.body;
      const foundUser = await models.user.findOne({
        where: { email: body?.email },
      });

      if (foundUser) {
        return res.status(400).json({ error: "User email already exists" });
      }

      // Hash the password
      const hashedPassword = await argon2.hash(body?.password);

      // Save user to the database
      const user = Object.assign({ ...body }, { password: hashedPassword });
      const userCreated = await models.user.create(user);

      // Créer le JWT pour l'utilisateur
      const userJWT = jwt.sign({ ...userCreated.toJSON() }, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRED_IN,
      });

      // Créer le refreshToken
      const refreshToken = jwt.sign(
        { ...userCreated.toJSON() },
        JWT_SECRET_KEY,
        {
          expiresIn: REFRESH_TOKEN_EXPIRED_IN,
        }
      );

      return res.status(201).json({
        message: "Registration successful",
        token: userJWT,
        refreshToken: refreshToken,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async login(req, res) {
    try {
      const { email } = req.body;

      // Find the user by email
      const user = await models.user.findOne({ where: { email } });

      // Check if the user exists
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await argon2.verify(
        user.password,
        req.body?.password
      );

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Créer le JWT pour l'utilisateur
      const userJWT = jwt.sign(user.toJSON(), JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRED_IN,
      });

      // Créer le refreshToken
      const refreshToken = jwt.sign(user.toJSON(), JWT_SECRET_KEY, {
        expiresIn: REFRESH_TOKEN_EXPIRED_IN,
      });

      return res.json({
        token: userJWT,
        refreshToken: refreshToken,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await models.user.findOne({
        where: { email: email?.toLowerCase() },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const token = jwt.sign({ email: user.email }, JWT_SECRET_KEY, {
        expiresIn: "2h",
      });
      // Send the token to the user's email (implement email sending separately)
      const infoEmail = await sendEmailForgetPassword(token, user);
      return res.json({
        message: "Password reset email sent successfully",
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async resetPasswordHtml(req, res) {
    const errorHtml = `<h1>Error : Invalid token</h1>`;
    const token = req.query?.token;
    let isValidJWT = "";
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        res.send(errorHtml);
        return;
      }
      isValidJWT = true;
      return payload;
    });
    if (!isValidJWT) {
      return;
    }
    const html = await render("auth/reset_password");
    return res.send(html);
  },
  async resetPassword(req, res) {
    try {
      const decodedToken = jwt.verify(req.body?.token, JWT_SECRET_KEY);
      const user = await models.user.findOne({
        where: { email: decodedToken?.email?.toLowerCase() },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const hashedPassword = await argon2.hash(req.body?.password);
      await user.update({ password: hashedPassword });
      return res.json({ message: "Password change successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async refreshAccessToken(req, res) {
    try {
      const refreshToken = req.header("Authorization")?.split("Bearer ")[1];

      if (!refreshToken) {
        return res
          .status(401)
          .json({ error: "Unauthorized - Refresh Token not provided" });
      }

      jwt.verify(refreshToken, JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .json({ error: "Forbidden - Invalid Refresh Token" });
        }

        // Supprimer la propriété 'exp' du payload si elle existe
        delete decoded.exp;

        // Générer un nouveau access token
        const newAccessToken = jwt.sign(decoded, JWT_SECRET_KEY, {
          expiresIn: JWT_EXPIRED_IN,
        });

        return res.json({ token: newAccessToken });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async refreshAccessToken(req, res) {
    try {
      const oldToken = req.token; 
      if (!oldToken) {
        return res
          .status(401)
          .json({ error: "Unauthorized - Token not provided" });
      }

      jwt.verify(oldToken, JWT_SECRET_KEY, async (err, user) => {
        if (err) {
          return res.status(403).json({ error: "Forbidden - Invalid token" });
        }

        // Si la vérification est réussie, créez un nouveau token
        const newToken = jwt.sign({ ...user }, JWT_SECRET_KEY, {
          expiresIn: JWT_EXPIRED_IN,
        });

        // Envoyez le nouveau token en réponse
        return res.json({ token: newToken });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
});
export default authController(models);
export const auth = authController;
async function sendEmailForgetPassword(token, user) {
  const frontHost =
    process.env.NODE_ENV === "production"
      ? "https://collok-easy-back.onrender.com/"
      : "http://localhost:3000/";
  const htmlContent = await render("auth/mails/reset_password", {
    firstname: user.firstname,
    supportEmail: "support@collok-easy.com",
    resetLink: frontHost + `auth/reset-password?token=${token}`,
  });
  return sendEmail(user.email, htmlContent);
}
