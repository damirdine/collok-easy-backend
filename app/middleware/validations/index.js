import { validationResult } from "express-validator";

export default function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}
export function handleUserColocationAccess(req, res, next) {
  const colocationId = req.params.colocationId;
  const userId = req.user.colocation_id;

  if (colocationId !== userId) {
    return res.status(422).json({ error: "Accès refusé à cette colocation." });
  }
  next();
}
