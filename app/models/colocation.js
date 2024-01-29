export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const colocation = sequelize.define(
    "colocation",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
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
      name: { type: DataTypes.STRING, allowNull: false },
      admin_user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      tableName: "colocation",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  colocation.associate = (models) => {
    colocation.hasMany(models.user, { foreignKey: "colocation_id" });
    colocation.hasMany(models.objective, {
      foreignKey: "colocation_id",
      as: "objectives",
    });
    colocation.belongsTo(models.user, {
      foreignKey: "admin_user_id",
      as: "admin_user",
    });
  };

  return colocation;
};
