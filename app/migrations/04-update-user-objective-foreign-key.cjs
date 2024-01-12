"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Supprimer l'ancienne contrainte
    await queryInterface.removeConstraint(
      "user_objective",
      "user_objective_ibfk_2"
    );

    // Ajouter la nouvelle contrainte avec ON DELETE CASCADE
    await queryInterface.addConstraint("user_objective", {
      fields: ["objective_id"],
      type: "foreign key",
      name: "user_objective_ibfk_2",
      references: {
        table: "objective",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Supprimer la nouvelle contrainte
    await queryInterface.removeConstraint(
      "user_objective",
      "user_objective_ibfk_2"
    );

    // Ajouter l'ancienne contrainte si nécessaire
    await queryInterface.addConstraint("user_objective", {
      fields: ["objective_id"],
      type: "foreign key",
      name: "user_objective_ibfk_2",
      references: {
        table: "objective",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
};
