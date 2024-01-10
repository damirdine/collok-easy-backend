export const JWT_SECRET_KEY =
  process.env?.JWT_SECRET_KEY || "very_strong_and_long_phrase_secret";
export const JWT_EXPIRED_IN = process.env?.JWT_EXPIRED_IN || "1h";
