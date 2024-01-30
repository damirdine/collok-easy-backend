# Documentation du Backend du projet Collok-Easy 🚀

### Prérequis 🛠️

- Node.js : Assurez-vous que Node.js est installé sur votre machine avec une version minimale de Node.js 20. Vous pouvez le télécharger depuis [nodejs.org](https://nodejs.org/).
- npm : npm est le gestionnaire de paquets pour Node.js et est livré avec l'installation de Node.js.
- Docker : Si Docker n'est pas installé, téléchargez et installez-le depuis [docker.com](https://www.docker.com/get-started).

## Étapes de configuration (Setup) ⚙️

### 1. Cloner le dépôt

Clonez le dépôt du projet à partir de la source :

```bash
git clone <repository-url>
cd <project-folder>
cd app
```

### 2. Installer les dépendances

Exécutez la commande suivante pour installer les dépendances du projet :

```bash
npm install
```

### 3. Démarrer Docker Compose

Docker Compose est utilisé pour configurer la base de données. Exécutez la commande suivante pour démarrer les services requis définis dans le fichier `docker-compose.yml` :

```bash
docker-compose up
```

Si vous devez reconstruire les images, utilisez l'option `--build` :

```bash
docker-compose up --build
```

### 4. Exécuter les migrations de la base de données et/ou les semences (optionnel)

Les migrations Sequelize sont utilisées pour gérer les changements de schéma de base de données. Exécutez la commande suivante pour appliquer les migrations et configurer les tables de la base de données :

```bash
npx sequelize-cli db:migrate
```

Les semences sont des scripts qui peuplent la base de données avec des données initiales. Si votre projet inclut des données de départ, vous pouvez exécuter les deux processus en une seule fois avec la commande suivante :

```bash
npm run db:up
```

Ou, si vous préférez exécuter les migrations et les semences séparément, utilisez les commandes suivantes :

```bash
npx sequelize-cli db:migrate
```

```bash
npx sequelize-cli db:seed:all
```

#### [Plus de détails sur la migration et les seeders](/documentation/migration.md)

## Mise en Place des Variables d'Environnement 🌐

### Fichiers .env et .env.example

Le projet utilise des fichiers `.env` pour stocker les variables d'environnement spécifiques au déploiement, telles que les informations de base de données, les clés secrètes, etc. Ces fichiers sont également importants pour la configuration locale du projet. Pour faciliter la mise en place, deux fichiers exemple, `.env.example` et `.env.test.example`, sont fournis dans la racine du projet.

### 1. Fichier .env.example

Le fichier `.env.example` contient des exemples de toutes les variables d'environnement nécessaires pour faire fonctionner l'application. Il est destiné à être utilisé comme modèle pour créer le fichier `.env` réel. Voici un exemple partiel:

```env
NODE_ENV=development
JWT_SECRET_KEY="very_strong_and_long_phrase_secret_#$"
JWT_EXPIRED_IN="1h"
SEQUELIZE_LOG=false

PROD_DB_URL=mysql://collock-easy:password@db:3306/collock-easy

GMAIL_EMAIL=example@gmail.com
GMAIL_PASSWORD=genrated_app_password

# Autres variables d'environnement...
```

Pour configurer l'application localement, copiez simplement le contenu de `.env.example` dans un nouveau fichier `.env` à la racine du projet et remplissez les valeurs appropriées.

### 2. Fichier .env.test.example

Le fichier `.env.test.example` suit la même logique, mais est spécifiquement destiné à l'environnement de test. Il peut inclure des configurations distinctes pour la base de données de test, par exemple. Exemple partiel:

```env
NODE_ENV=development
JWT_SECRET_KEY="very_strong_and_long_phrase_secret_#$"
JWT_EXPIRED_IN="1h"
SEQUELIZE_LOG=false

PROD_DB_URL=mysql://collock-easy:password@db:3306/collock-easy

GMAIL_EMAIL=example@gmail.com
GMAIL_PASSWORD=genrated_app_password
```

Pour configurer les tests localement, copiez le contenu de `.env.test.example` dans un nouveau fichier `.env.test` à la racine du projet.

## Lancer le Projet ▶️

Après avoir configuré les variables d'environnement comme indiqué précédemment, suivez les étapes ci-dessous pour lancer le projet en mode développement.

### Installation des Dépendances

Assurez-vous d'avoir Node.js et npm installés sur votre machine. Ensuite, installez les dépendances du projet en exécutant la commande suivante à la racine du projet :

```bash
npm install
```

## Lancer le Projet en Mode Développement

Utilisez la commande suivante pour démarrer le projet en mode développement :

```bash
npm run dev
```

Cette commande utilise `node --watch` pour surveiller les changements dans le code et redémarre automatiquement le serveur lorsqu'une modification est détectée.

Le serveur devrait démarrer, et vous devriez voir des messages de journalisation indiquant que le serveur est en cours d'exécution sur un certain port (généralement le port 3000).

Assurez-vous de consulter la documentation pour toute information spécifique à l'application, telle que les points d'API disponibles, les fonctionnalités, etc. La documentation peut être fournie dans le fichier README.md à la racine du projet ou dans un dossier dédié.

## Architecture MVC (Modèle-Vue-Contrôleur) 🏗️

### 1. **Modèles (Models) :**

- Responsable de la gestion des données et des interactions avec la base de données via Sequelize.
- Chaque modèle correspond à une table dans la base de données.
- Exemple : `user.js`, `colocation.js`, `outgoing.js`, `task.js`, etc.

### 2. **Vues (Views) :**

- Dans le contexte d'une API RESTful, les vues sont généralement représentées par les réponses JSON renvoyées par les contrôleurs.
- Pour une application avec une interface utilisateur, les vues peuvent être des fichiers HTML, mais dans notre cas, elles peuvent être principalement des réponses JSON.

### 3. **Contrôleurs (Controllers) :**

- Gère la logique métier de l'application.
- Traite les requêtes HTTP, appelle les méthodes appropriées des modèles, et renvoie les ré

ponses.

- Exemple : `authController.js`, `colocationController.js`, `outgoingsController.js`, `tasksController.js`, `usersController.js`.

### 4. **Middleware :**

- Utilisez des middlewares pour des fonctionnalités transversales comme l'authentification, la validation des données, etc.
- Exemple : `auth.js`, `validations/auth.js`, `validations/colocation.js`, etc.

### 6. **Configuration :**

- Stockez la configuration de l'application dans un dossier dédié.
- Exemple : `config/config.js` pour les differents config d'environnement pour sequelize.

### 7. **Tests :**

- Écrivez des tests unitaires et d'intégration pour chaque composant important de votre application.
- Organisez nos tests dans les dossiers appropriés, tels que `tests/units` et `tests/e2e`.

## Dépendances Majeures 📦

1. **argon2**: Bibliothèque de hachage de mot de passe sécurisée.
2. **express**: Cadre d'application web pour Node.js.
3. **jsonwebtoken**: Mise en œuvre des JSON Web Tokens (JWT) pour l'authentification.
4. **sequelize**: ORM (Object-Relational Mapping) pour interagir avec la base de données MySQL.
5. **swagger-jsdoc** et **swagger-ui-express**: Génération et affichage de la documentation Swagger.

## Dépendances de Développement 🛠️

1. **jest**: Cadre de test JavaScript.
2. **supertest**: Bibliothèque pour tester les applications Express.

## [Documentation sur l'authentification...](/documentation/authentication.md) 📚✨
