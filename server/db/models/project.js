"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" });
    }
  }
  Project.init(
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      address: DataTypes.STRING,
      name: DataTypes.STRING,
      genre: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      x: DataTypes.STRING,
      y: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
