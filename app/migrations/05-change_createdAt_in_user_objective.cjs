"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("user_objective", "createdAt", {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.changeColumn("user_objective", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.renameColumn(
      "user_objective",
      "createdAt",
      "created_at"
    );
    await queryInterface.renameColumn(
      "user_objective",
      "updatedAt",
      "updated_at"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "user_objective",
      "created_at",
      "createdAt"
    );
    await queryInterface.renameColumn(
      "user_objective",
      "updated_at",
      "updatedAt"
    );
    await queryInterface.changeColumn("user_objective", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    });
    await queryInterface.changeColumn("user_objective", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    });
  },
};
