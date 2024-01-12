import express from "express";
import authController from "../controllers/authController.js";
import authValidator from "../middleware/validations/auth.js";
import { translate } from "../helpers/translate.js";

const { errors, msg } = translate("fr");
const authRouter = express.Router();

authRouter.post("/register", authValidator.register, authController.register);
authRouter.post("/login", authValidator.login, authController.login);

authRouter.post(
  "/forget-password",
  authValidator.forgetPassword,
  authController.forgotPassword
);
authRouter.post(
  "/reset-password",
  authValidator.resetPassword,
  authController.resetPassword
);

authRouter.post("/refresh-token", authController.refreshAccessToken);

export default authRouter;

const acceptLangHeader = {
  in: "header",
  name: "Accept-Language",
  type: "string",
  enum: ["fr", "en"],
  required: false,
  default: "fr",
};

const parameters = [acceptLangHeader];

const defaultErrors = {
  500: {
    description: "Server process error.",
    content: {
      "application/json": {
        example: {
          error: errors.internal_server,
        },
      },
    },
  },
  401: {
    description: "Token Exprired",
    content: {
      "application/json": {
        example: {
          error: errors.invalid_credentials_401,
        },
      },
    },
  },
  403: {
    description: "Invalide Token",
    content: {
      "application/json": {
        example: {
          error: errors.invalid_credentials_403,
        },
      },
    },
  },
};

const userNotFound = {
  422: {
    // Unprocessable Entity
    description: "User not found.",
    content: {
      "application/json": {
        example: {
          error: errors.user_not_found,
        },
      },
    },
  },
};

export const swagger = {
  "/api/v1/auth/register": {
    post: {
      summary: "Register a new user",
      description: "Register a new user with the provided information.",
      tags: ["Authentication"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            example: {
              firstname: "John",
              lastname: "Doe",
              email: "example@example.com",
              password: "Password@2",
              birthday: "1990-01-01",
              phone: "1234567890",
              pseudo: "john_doe",
              gender: "male",
              avatar: "https://example.com/avatar.jpg",
            },
          },
        },
      },
      parameters,
      responses: {
        201: {
          description: "Successful response",
          content: {
            "application/json": {
              example: {
                message: msg.success_register,
                token: "<generated_access_token>",
              },
            },
          },
        },
        422: {
          description: "User email already exists",
          content: {
            "application/json": {
              example: {
                error: errors.email_already_used,
              },
            },
          },
        },
        ...defaultErrors,
      },
    },
  },
  "/api/v1/auth/login": {
    post: {
      summary: "login a user",
      description: "Register a new user with the provided information.",
      tags: ["Authentication"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            example: {
              email: "example@example.com",
              password: "Password@2",
            },
          },
        },
      },
      parameters,
      responses: {
        201: {
          description: "Successful response",
          content: {
            "application/json": {
              example: {
                message: msg.success_login,
                token: "<generated_access_token>",
                refreshToken: "<generated_refresh_token>",
              },
            },
          },
        },
        ...userNotFound,
        ...defaultErrors,
      },
    },
  },
  "/api/v1/auth/forget-password": {
    post: {
      summary: "Forget password endpoint",
      description: "Send forget password link to the user email.",
      tags: ["Authentication"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            example: {
              email: "example@example.com",
            },
          },
        },
      },
      parameters,
      responses: {
        200: {
          description: "Successful response ! jwt available for max 4h",
          content: {
            "application/json": {
              example: {
                message: "Password reset email sent successfully",
                token: "<reset_password_jwt_token>",
              },
            },
          },
        },
        400: {
          description: "Process failed",
          content: {
            "application/json": {
              example: {
                error: "User not exist or Server Error",
              },
            },
          },
        },
        ...defaultErrors,
      },
    },
  },
  "/api/v1/auth/reset-password": {
    post: {
      summary: "Confirm reset password endpoint",
      description: "Send Confirm reset password endpoint.",
      tags: ["Authentication"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            example: {
              token: "<reset_password_jwt_token>",
              password: "password",
              confirmPassword: "password",
            },
          },
        },
      },
      parameters,
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              example: {
                message: "Password change successfully",
              },
            },
          },
        },
        400: {
          description: "Process failed",
          content: {
            "application/json": {
              example: {
                error: "User not exist or Server Error",
              },
            },
          },
        },
        ...defaultErrors,
      },
    },
  },
};
