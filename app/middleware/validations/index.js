import { validationResult } from "express-validator";

export default function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}
export function handleUserColocationAccess(req, res, next) {
  const urlPattern = /\/colocation\/(\w+)\//;
  const match = req.originalUrl.match(urlPattern);
  const colocationId = match ? parseInt(match[1]) : null;
  console.log(colocationId, " index colocationId");

  const userId = req.user.colocation_id;
  console.log(userId, "index userId");
  if (colocationId !== userId) {
    return res.status(403).json({ error: "Accès refusé à cette colocation." });
  }
  next();
}
