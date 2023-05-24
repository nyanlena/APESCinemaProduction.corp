"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Project,
      ProjectUser,
      Category,
      Chat,
      Favorite,
      Status,
    }) {
      // define association here
      this.belongsTo(Category, { foreignKey: "categoryId" });
      this.belongsTo(Status, { foreignKey: "statusId" });
      this.hasMany(Project, { foreignKey: "userId" });
      this.hasMany(ProjectUser, { foreignKey: "userId" });
      this.hasMany(Chat, { foreignKey: "userId" });
      this.hasMany(Favorite, { foreignKey: "fromId", as: "Sent" });
      this.hasMany(Favorite, { foreignKey: "toId", as: "Received" });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      patronymicname: DataTypes.STRING,
      city: DataTypes.STRING,
      age: DataTypes.STRING,
      img: DataTypes.STRING,
      education: DataTypes.TEXT,
      experience: DataTypes.TEXT,
      aboutMe: DataTypes.TEXT,
      phone: DataTypes.STRING,
      linkTg: DataTypes.STRING,
      linkInst: DataTypes.STRING,
      linkWA: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
