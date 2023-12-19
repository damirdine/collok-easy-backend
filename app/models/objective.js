export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const objective = sequelize.define(
    "objective",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      deadline: {
        type: DataTypes.DATE,
      },
      colocation_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "colocation",
          key: "id",
        },
      },
      created_by: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      tableName: "objective",
    }
  );

  objective.associate = (models) => {
    objective.belongsTo(models.colocation, { foreignKey: "colocation_id" });
    objective.belongsTo(models.user, { foreignKey: "created_by" });
    objective.belongsToMany(models.user, {
      through: "user_objective",
      as: "assigned_users",
      foreignKey: "objective_id",
    });
    objective.hasOne(models.task, {
      foreignKey: "objective_id",
      constraints: false,
      as: "task",
      scope: {
        outgoing: null,
      },
    });
    objective.hasOne(models.outgoing, {
      foreignKey: "objective_id",
      constraints: false,
      as: "outgoing",
      scope: {
        task: null,
      },
    });
  };

  return objective;
};
