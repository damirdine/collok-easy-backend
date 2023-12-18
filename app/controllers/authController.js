import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import models from "../models/index.js";

const SALT_ROUNDS = 10;
const { JWT_SECRET_KEY, JWT_EXPIRED_IN } = process.env;

const DEFAULT_SECRET_KEY = "secret";
const DEFAULT_EXPIRED = "3d";

const authController = {
  async register(req, res) {
    try {
      const body = req.body;

      const foundUser = await models.user.findOne({
        where: { email: body?.email },
      });
      if (foundUser) {
        return res
          .status(400)
          .json({ error: { message: "User email already exists" } });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(body?.password, SALT_ROUNDS);

      // Save user to the database
      const user = Object.assign({ ...body }, { password: hashedPassword });
      const userCreated = await models.user.create(user);

      const { password, ...userJWT } = userCreated.toJSON();
      const token = jwt.sign(
        { ...userJWT },
        JWT_SECRET_KEY || DEFAULT_SECRET_KEY,
        {
          expiresIn: JWT_EXPIRED_IN || DEFAULT_EXPIRED,
        }
      );

      return res
        .status(201)
        .json({ message: "Registration successful", token });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: { message: "Internal Server Error" } });
    }
  },
  async login(req, res) {
    try {
      const { email } = req.body;

      // Find the user by email
      const user = await models.user.findOne({ where: { email } });

      // Check if the user exists
      if (!user) {
        return res
          .status(401)
          .json({ error: { message: "Invalid credentials" } });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(
        req.body?.password,
        user.password
      );

      if (!passwordMatch) {
        return res
          .status(401)
          .json({ error: { message: "Invalid credentials" } });
      }

      const { password, ...userJWT } = user;

      // Create a JWT token
      const token = jwt.sign(userJWT, JWT_SECRET_KEY || DEFAULT_SECRET_KEY, {
        expiresIn: JWT_EXPIRED_IN || DEFAULT_EXPIRED,
      });

      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: { message: "Internal Server Error" } });
    }
  },
};

export default authController;
