"use-strict";

const translation = {
  default: "fr",
  en: {
    error: {
      user_not_found: "User not found.",
      password_no_valid:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.",
      colocation_access_denied: "Accès refusé à cette colocation.",
      internal_server: "Internal Server Error",
    },
    msg: {
      success_login: "User login succesfuly.",
      success_register: "Inscription réussie",
    },
  },
  fr: {
    error: {
      user_not_found: "Utilisateur non trouvée.",
      password_no_valid:
        "Le mot de passe doit comporter au moins 8 caractères et inclure au moins une lettre majuscule, un chiffre et un caractère spécial.",
      colocation_access_denied: "Access denied to this colocation.",
      internal_server: "Erreur interne du serveur",
    },
    msg: {
      success_login: "Utilisateur connnecté avec succés.",
      success_register: "Inscription réussie",
    },
  },
};

/**
 * Object representing error messages and success messages in a multilingual context.
 * @typedef {Object} Messages
 * @property {Object} errors - Error messages.
 * @property {string} errors.user_not_found - Message for user not found error. (French: "Utilisateur non trouvée.")
 * @property {string} errors.password_no_valid - Message for invalid password error. (French: "Le mot de passe doit comporter au moins 8 caractères et inclure au moins une lettre majuscule, un chiffre et un caractère spécial.")
 * @property {string} errors.colocation_access_denied - Message for colocation access denied error. (French: "Access denied to this colocation.")
 * @property {string} errors.internal_server - Message for internal server error. (French: "Erreur interne du serveur.")
 * @property {Object} msg - Success messages.
 * @property {string} msg.success_login - Message for successful login. (French: "Utilisateur connecté avec succès.")
 * @property {string} msg.success_register - Message for successful login. (French: "Utilisateur connecté avec succès.")
 */

/**
 * Translates messages based on the specified language.
 * @param {string} [lang="fr"] - The language code. Defaults to "fr" (French).
 * @returns {Messages | null} - An object containing translated messages for the specified language, or null if the language is not found.
 */
export function translate(lang = "fr") {
  try {
    return translation[lang] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
