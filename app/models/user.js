export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: {
        field: "created_at",
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      updated_at: {
        field: "updated_at",
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATE,
      },
      phone: {
        type: DataTypes.STRING,
      },
      pseudo: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      colocation_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "colocation",
          key: "id",
        },
      },
    },
    {
      tableName: "user",
      // underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  user.associate = (models) => {
    user.belongsToMany(models.colocation, { through: "user_colocation" });
    user.hasOne(models.colocation, {
      foreignKey: "admin_user_id",
      as: "admin_user",
    });
    user.belongsToMany(models.objective, {
      through: "user_objective",
      as: "objectives",
      foreignKey: "user_id",
    });
  };

  return user;
};
