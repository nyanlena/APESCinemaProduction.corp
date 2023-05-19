"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
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
  Chat.init(
    {
      type: DataTypes.STRING,
      body: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Chat",
    }
  );
  return Chat;
};
