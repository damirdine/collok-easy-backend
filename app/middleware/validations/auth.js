import { check } from "express-validator";
import handleValidationErrors from "./index.js";

const authValidator = {
  login: [check("email").isEmail(), check("password").isLength({ min: 8 })],
  register: [check("email").isEmail(), check("password").isLength({ mi: 2 })],
  forgetPassword: [check("email").isEmail(), handleValidationErrors],
};

export default authValidator;
