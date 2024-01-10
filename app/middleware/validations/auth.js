import { check } from "express-validator";
import handleValidationErrors from "./index.js";

const authValidator = {
  login: [check("email").isEmail(), check("password").isLength({ min: 8 })],
  register: [check("email").isEmail(), check("password").isLength({ min: 2 })],
  forgetPassword: [check("email").isEmail(), handleValidationErrors],
  resetPassword: [
    check("token").isJWT(),
    check("password")
      .isLength({ min: 2 })
      .withMessage("Password must be at least 5 characters long"),
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
    handleValidationErrors,
  ],
};

export default authValidator;
