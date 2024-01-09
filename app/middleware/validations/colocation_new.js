import { check, validationResult } from "express-validator";

const colocationValidation = {
  validateGetColocationById: [
    check("colocationID")
      .isInt()
      .withMessage(
        "Invalid colocationID format. It should be a positive integer."
      ),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  validateCreateColocation: [
    check("name")
      .isString()
      .isLength({ min: 3, max: 50 })
      .withMessage(
        "Name is required and should be a string with length between 3 and 50 characters."
      ),
    check("admin_user_id")
      .isInt()
      .withMessage("admin_user_id should be a positive integer."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  validateUpdateColocationName: [
    check("colocationID")
      .isInt()
      .withMessage(
        "Invalid colocationID format. It should be a positive integer."
      ),
    check("name")
      .isString()
      .isLength({ min: 3, max: 50 })
      .withMessage(
        "Name is required and should be a string with length between 3 and 50 characters."
      ),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  validateGetColocationAdmin: [
    check("colocationID")
      .isInt()
      .withMessage(
        "Invalid colocationID format. It should be a positive integer."
      ),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  validateUpdateColocationAdmin: [
    check("colocationID")
      .isInt()
      .withMessage(
        "Invalid colocationID format. It should be a positive integer."
      ),
    check("user_id")
      .isInt()
      .withMessage("newAdminID should be a positive integer."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  validateAddColocationMember: [
    check("colocationID")
      .isInt()
      .withMessage(
        "Invalid colocationID format. It should be a positive integer."
      ),
    check("user_id")
      .isInt()
      .withMessage("user_id should be a positive integer."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  validateDeleteColocationMember: [
    check("colocationID")
      .isInt()
      .withMessage(
        "Invalid colocationID format. It should be a positive integer."
      ),
    check("user_id")
      .isInt()
      .withMessage("user_id should be a positive integer."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
};

export default colocationValidation;
