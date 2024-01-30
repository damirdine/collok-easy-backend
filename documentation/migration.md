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
