import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import models from "../models/index.js";
import {
  JWT_EXPIRED_IN,
  JWT_SECRET_KEY,
  REFRESH_TOKEN_EXPIRED_IN,
  REFRESH_TOKEN_SECRET,
} from "../helpers/constant.js";
import { sendEmail } from "../helpers/email.js";
import { render } from "../helpers/template.js";
import {
  translate,
  error as errorMsg,
  msgSuccess,
} from "../helpers/translate.js";

const { msg, errors } = translate();

const generateTokensAndExpiration = async (user) => {
  // Créer le JWT pour l'utilisateur
  const accessToken = jwt.sign(user.toJSON(), JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRED_IN,
  });

  // Créer le refreshToken
  const refreshToken = jwt.sign(user.toJSON(), REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRED_IN,
  });

  return { accessToken, refreshToken };
};

const authController = (models) => ({
  async register(req, res) {
    try {
      const body = req.body;
      const foundUser = await models.user.findOne({
        where: { email: body?.email?.toLowerCase() },
      });

      if (foundUser) {
        return res.status(422).json({ error: errorMsg(req).user_not_found });
      }

      // Hash the password
      const hashedPassword = await argon2.hash(body?.password);

      // Save user to the database
      const user = Object.assign({ ...body }, { password: hashedPassword });
      const userCreated = await models.user.create(user);

      const { accessToken, refreshToken, accessTokenExpiration } =
        await generateTokensAndExpiration(userCreated);

      return res.status(201).json({
        message: msg.success_register,
        token: accessToken,
        accessTokenExpiration: accessTokenExpiration,
        refreshToken: refreshToken,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: errorMsg(req).internal_server });
    }
  },
  async login(req, res) {
    try {
      const { email } = req.body;

      // Find the user by email
      const user = await models.user.findOne({ where: { email } });

      // Check if the user exists
      if (!user) {
        return res.status(422).json({ error: errorMsg(req).user_not_found });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await argon2.verify(
        user.password,
        req.body?.password
      );
      if (!passwordMatch) {
        return res
          .status(422)
          .json({ error: errorMsg(req)?.password_not_match });
      }

      const { accessToken, refreshToken, accessTokenExpiration } =
        await generateTokensAndExpiration(user);

      return res.status(201).json({
        message: msgSuccess(req).success_login,
        token: accessToken,
        accessTokenExpiration: accessTokenExpiration,
        refreshToken: refreshToken,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: errorMsg(req).internal_server });
    }
  },

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await models.user.findOne({
        where: { email: email?.toLowerCase() },
      });
      if (!user) {
        return res.status(404).json({ error: errorMsg(req).user_not_found });
      }
      const token = jwt.sign({ email: user.email }, JWT_SECRET_KEY, {
        expiresIn: "2h",
      });
      // Send the token to the user's email (implement email sending separately)
      const infoEmail = await sendEmailForgetPassword(token, user);
      return res.json({
        message: msg.success_password_reset,
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: errorMsg(req).internal_server });
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
        return res.status(404).json({ error: errorMsg(req).user_not_found });
      }
      const hashedPassword = await argon2.hash(req.body?.password);
      await user.update({ password: hashedPassword });
      return res.json({ message: msg.success_password_reset });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: errorMsg(req).internal_server });
    }
  },
  async refreshAccessToken(req, res) {
    try {
      const refreshToken = req.header("Authorization")?.split("Bearer ")[1];

      if (!refreshToken) {
        return res
          .status(401)
          .json({ error: errorMsg(req).invalid_credentials });
      }

      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .json({ error: errorMsg(req).invalid_credentials_403 });
        }

        // Supprimer la propriété 'exp' du payload si elle existe
        delete decoded.exp;
        delete decoded.iat;

        // Vérifier si l'utilisateur existe toujours dans la base de données
        const user = await models.user.findByPk(decoded.id);
        if (!user) {
          return res.status(404).json({ error: errors.user_not_found });
        }

        const { accessToken, accessTokenExpiration } =
          await generateTokensAndExpiration(user);

        return res.json({
          token: accessToken,
          accessTokenExpiration: accessTokenExpiration,
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: errorMsg(req).internal_server });
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
