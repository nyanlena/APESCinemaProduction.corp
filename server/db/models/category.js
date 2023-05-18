"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Status, User }) {
      // define association here
      this.belongsTo(Status, { foreignKey: "statusId" });
      this.hasMany(User, { foreignKey: "categoryId" });
    }
  }
  Category.init(
    {
      title: DataTypes.STRING,
      statusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
