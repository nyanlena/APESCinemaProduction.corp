"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProjectUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Project }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(Project, { foreignKey: "projectId" });
    }
  }
  ProjectUser.init(
    {
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProjectUser",
    }
  );
  return ProjectUser;
};
