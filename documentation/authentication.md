## Documentation systeme d'authentification

1. **Controller d'authentification (`authController.js`):**

   - Gère les actions d'inscription, de connexion, de réinitialisation de mot de passe, de génération de tokens, et de rafraîchissement du token d'accès.
   - Utilise Argon2 pour le hachage des mots de passe et JSON Web Token (JWT) pour la gestion des tokens.
   - Envoie des emails pour la réinitialisation du mot de passe.

2. **Modèle utilisateur (`user.js`):**

   - Définit le modèle Sequelize pour l'utilisateur, avec des champs tels que le nom, l'email, le mot de passe, la date de naissance, etc.
   - Établit des associations avec d'autres modèles, tels que les colocations et les objectifs.

3. **Routeur d'authentification (`authRouter.js`):**

   - Gère les routes liées à l'authentification, telles que l'inscription, la connexion, la réinitialisation de mot de passe, et le rafraîchissement du token.

4. **Router principal (`router.js`):**

   - Agrège tous les routeurs, y compris le routeur d'authentification, le routeur utilisateur, et d'autres routeurs liés aux fonctionnalités de l'application.

5. **Tests end-to-end (`tests/e2e/`):**

   - Utilise `supertest` pour effectuer des tests end-to-end sur les fonctionnalités d'authentification.
   - Comprend des tests pour l'inscription, la connexion, et la gestion du profil utilisateur.

6. **Middleware d'authentification (`authMiddleware.js`):**

   - Vérifie la validité du token d'accès dans les requêtes.
   - Rafraîchit le token d'accès si le token est sur le point d'expirer.

7. **Middleware de validation d'authentification (`authValidator.js`):**

   - Utilise `express-validator` pour définir des règles de validation pour les données liées à l'authentification, comme l'email et le mot de passe.
   - Gère la validation des données d'entrée avant de passer à la logique du contrôleur.

8. **Handle de middleware de validation (`handleValidationErrors.js`):**

   - Gère les erreurs de validation générées par `express-validator` en renvoyant une réponse JSON appropriée.

9. **Handle de l'accès à la colocation (`handleUserColocationAccess.js`):**
   - Vérifie si l'utilisateur a accès à la colocation spécifiée dans la requête.
   - Empêche l'accès à une colocation si l'utilisateur n'est pas autorisé.

Dans l'ensemble, notre architecture suit une approche modulaire, avec une séparation claire des responsabilités entre les différents composants. Cela facilite la maintenance, les tests, et l'évolutivité de votre application.
