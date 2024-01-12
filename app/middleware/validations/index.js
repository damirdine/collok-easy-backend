import { validationResult } from "express-validator";
import { error } from "../../helpers/translate";

export default function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}
export function handleUserColocationAccess(req, res, next) {
  let colocationId = req.param?.colocationId;
  if (!colocationId) {
    const urlPattern = /\/colocation\/(\w+)\//;
    const match = req.originalUrl.match(urlPattern);
    colocationId = match ? parseInt(match[1]) : null;
  }
  const userColocationId = req.user.colocation_id;

  if (colocationId !== userColocationId) {
    return res.status(403).json({ error: error(req).colocation_access_denied });
  }
  next();
}
