"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Category, { foreignKey: "statusId" });
      // define association here
    }
  }
  Status.init(
    {
      role: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Status",
    }
  );
  return Status;
};
