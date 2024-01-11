"use-strict";

const translation = {
  default: "fr",
  en: {
    errors: {
      user_not_found: "User not found.",
      password_no_valid:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.",
      colocation_access_denied: "Accès refusé à cette colocation.",
    },
    msg: {
      success_login: "User login succesfuly.",
    },
  },
  fr: {
    errors: {
      user_not_found: "Utilisateur non trouvée.",
      password_no_valid:
        "Le mot de passe doit comporter au moins 8 caractères et inclure au moins une lettre majuscule, un chiffre et un caractère spécial.",
      colocation_access_denied: "Access denied to this colocation.",
    },
    msg: {
      success_login: "Utilisateur connnecté avec succés.",
    },
  },
};

export function translate(
  content = "errors.user_not_found",
  lang = translation.default
) {
  const [type, data] = content.split(".");
  try {
    return translation[lang][type][data] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
