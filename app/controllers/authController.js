import * as argon2 from "argon2";
import jwt from "jsonwebtoken";

import models from "../models/index.js";
import { JWT_EXPIRED_IN, JWT_SECRET_KEY } from "../helpers/constant.js";
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

      const { password, ...userJWT } = userCreated.toJSON();
      const token = jwt.sign({ ...userJWT }, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRED_IN,
      });

      return res
        .status(201)
        .json({ message: "Registration successful", token });
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

      const { password, ...userJWT } = user.toJSON();

      // Create a JWT token
      const token = jwt.sign(userJWT, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRED_IN,
      });

      return res.json({ token });
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
