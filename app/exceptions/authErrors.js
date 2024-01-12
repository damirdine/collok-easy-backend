import { error as errorMsg } from "../helpers/translate.js";

export default class AuthError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = "AuthError";
    this.statusCode = statusCode;
  }
}

export function handleRequestExeption(error, res, req) {
  console.error(error);
  const notDefaultError = !(error instanceof Error);
  res.status(error?.statuCode || 500).send({
    error: notDefaultError ? error.message : errorMsg(req).internal_server,
  });
}
