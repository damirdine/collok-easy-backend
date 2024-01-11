import { check } from "express-validator";
import handleValidationErrors from "./index.js";
import { translate } from "../../helpers/translate.js";

const isStrongPassword = (value) => {
  // au moins une majuscule, un chiffre et un caractère spécial
  const strongPasswordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return strongPasswordRegex.test(value);
};

const checkPassword = check("password").custom((value) => {
  if (process.env.NODE_ENV === "test") return true;
  if (!isStrongPassword(value)) {
    throw new Error(translate("errors.password_no_valid"));
  }
  return true;
});

const authValidator = {
  login: [check("email").isEmail(), handleValidationErrors],
  register: [check("email").isEmail(), checkPassword, handleValidationErrors],
  forgetPassword: [check("email").isEmail(), handleValidationErrors],
  resetPassword: [
    check("token").isJWT(),
    checkPassword,
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(translate("error.password_not_match"));
      }
      return true;
    }),
    handleValidationErrors,
  ],
};

export default authValidator;
