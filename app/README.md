# Documentation du Backend du projet Collok-Easy

### Prérequis

- Node.js : Assurez-vous que Node.js est installé sur votre machine avec une version minimale de Node.js 20. Vous pouvez le télécharger depuis [nodejs.org](https://nodejs.org/).
- npm : npm est le gestionnaire de paquets pour Node.js et est livré avec l'installation de Node.js.
- Docker : Si Docker n'est pas installé, téléchargez et installez-le depuis [docker.com](https://www.docker.com/get-started).

## Étapes de configuration (Setup)

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

## Migrations

- Créer un modèle

```js
// models/table
export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const Table = sequelize.define("table", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("NOW"),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("NOW"),
      allowNull: false,
    },
    field: { type: DataTypes.STRING },
  });
  return Table;
};
```

- Créer la migration

```bash
npx sequelize-cli migration:generate --name migration_name
```

- Éditer le modèle de migration :

```js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("user", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      first_name: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("user");
  },
};
```

Et **renomer** `.js` en `.cjs` sinon erreur de requête pour les commandes avec CLI;

- Appliquer la migration

```bash
npx sequelize-cli db:migrate
```
