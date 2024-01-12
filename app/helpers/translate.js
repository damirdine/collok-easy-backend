"use-strict";

const translation = {
  default: "fr",
  fr: {
    error: {
      user_not_found: "Utilisateur non trouvé.",
      password_no_valid:
        "Le mot de passe doit comporter au moins 8 caractères et inclure au moins une lettre majuscule, un chiffre et un caractère spécial.",
      password_no_match: "Les mots de passe ne correspondent pas.",
      colocation_access_denied: "Accès refusé à cette colocation.",
      internal_server: "Erreur interne du serveur",
      invalid_credentials: "Non autorisé - Identifiants invalides",
      invalid_credentials_401: "Non autorisé - Identifiants invalides",
      invalid_credentials_403: "Interdit - Jeton de rafraîchissement invalide",
      email_already_used: "Cet email est déjà utilisé.",
      pseudo_already_used: "Le pseudo doit être unique.",
    },
    msg: {
      success_login: "Utilisateur connecté avec succès.",
      success_register: "Inscription réussie",
      success_password_reset: "Changement de mot de passe réussi",
      success_profile_update: "Profil mis à jour avec succès",
      success_profile_delete: "Profil supprimé avec succès",
    },
  },
  en: {
    error: {
      user_not_found: "User not found.",
      password_no_valid:
        "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.",
      password_no_match: "Passwords do not match.",
      colocation_access_denied: "Access denied to this colocation.",
      internal_server: "Internal server error",
      invalid_credentials: "Unauthorized - Invalid credentials",
      invalid_credentials_401: "Unauthorized - Invalid credentials",
      invalid_credentials_403: "Forbidden - Invalid Refresh Token",
      email_already_used: "This email is already in use.",
      pseudo_already_used: "The pseudo must be unique.",
    },
    msg: {
      success_login: "User successfully logged in.",
      success_register: "Registration successful",
      success_password_reset: "Password change successful",
      success_profile_update: "Profile updated successfully",
      success_profile_delete: "Profile deleted successfully",
    },
  },
};

/**
 * Object representing error messages in a multilingual context.
 * @typedef {Object} ErrorMessages
 * @property {string} user_not_found - Message for user not found error. (French: "Utilisateur non trouvée.")
 * @property {string} password_no_valid - Message for invalid password error. (French: "Le mot de passe doit comporter au moins 8 caractères et inclure au moins une lettre majuscule, un chiffre et un caractère spécial.")
 * @property {string} password_not_match - Message for password not matching error. (French: "Le mot de passe doit comporter au moins 8 caractères et inclure au moins une lettre majuscule, un chiffre et un caractère spécial.")
 * @property {string} colocation_access_denied - Message for colocation access denied error. (French: "Access denied to this colocation.")
 * @property {string} internal_server - Message for internal server error. (French: "Erreur interne du serveur.")
 * @property {string} invalid_credentials - Message for invalid credentials error. (French: "Erreur interne du serveur.")
 * @property {string} invalid_credentials_401 - Message for invalid credentials error (401). (French: "Erreur interne du serveur.")
 * @property {string} invalid_credentials_403 - Message for invalid credentials error (403). (French: "Erreur interne du serveur.")
 * @property {string} email_already_used - Message for email already used error. (French: "Erreur interne du serveur.")
 * @property {string} pseudo_already_used - Message for pseudo already used error. (French: "Erreur interne du serveur.")
 */

/**
 * Object representing success messages in a multilingual context.
 * @typedef {Object} SuccessMessages
 * @property {string} success_login - Message for successful login. (French: "Utilisateur connecté avec succès.")
 * @property {string} success_register - Message for successful registration. (French: "Utilisateur connecté avec succès.")
 * @property {string} success_password_reset - Message for successful password reset. (English only)
 * @property {string} success_profile_update - Message for successful profile update. (English only)
 * @property {string} success_profile_delete - Message for successful profile deletion. (English only)
 */

/**
 * Object representing error and success messages in a multilingual context.
 * @typedef {Object} Messages
 * @property {ErrorMessages} errors - Error messages.
 * @property {SuccessMessages} msg - Success messages.
 */

/**
 * Translates messages based on the specified language.
 * @param {string} [lang="fr"] - The language code. Defaults to "fr" (French).
 * @returns {Messages} - An object containing translated messages for the specified language, or null if the language is not found.
 */
export function translate(lang = "fr") {
  const validLang = ["fr", "en"];
  if (!validLang.includes(lang)) {
    return translation[translation.default || "fr"];
  }
  return translation[lang];
}
