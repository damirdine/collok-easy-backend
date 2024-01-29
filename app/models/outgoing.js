//models/outgoing.js
export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const outgoing = sequelize.define(
    "outgoing",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
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
      final_expense: { type: DataTypes.INTEGER, allowNull: false },
      objective_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "objective",
          key: "id",
        },
      },
    },

    {
      tableName: "outgoing",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Todo l'association
  outgoing.associate = (models) => {
    outgoing.belongsTo(models.objective, {
      foreignKey: "objective_id",
      constraints: false,
    });
  };

  return outgoing;
};
