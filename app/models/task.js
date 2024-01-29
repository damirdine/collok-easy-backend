export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const task = sequelize.define(
    "task",
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
      estimated_duration: { type: DataTypes.INTEGER },
      objective_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "objective",
          key: "id",
        },
      },
    },
    {
      tableName: "task",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  task.associate = (models) => {
    task.belongsTo(models.objective, {
      foreignKey: "objective_id",
      constraints: false,
    });
  };
  return task;
};
