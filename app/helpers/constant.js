export const JWT_SECRET_KEY =
  process.env?.JWT_SECRET_KEY || "very_strong_and_long_phrase_secret";
export const JWT_EXPIRED_IN = process.env?.JWT_EXPIRED_IN || "1h";
export const REFRESH_TOKEN_EXPIRED_IN =
  process.env?.REFRESH_TOKEN_EXPIRED_IN || "3m";

export const PASSWORD_RESET_SECRET_KEY =
  process.env.PASSWORD_RESET_SECRET_KEY || "very_strong_and_long_phrase_secret";

export const PASSWORD_RESET_EXPIRED_IN =
  process.env.PASSWORD_RESET_EXPIRED_IN || "4h";

export const GMAIL_EMAIL = process.env.GMAIL_EMAIL;
export const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
