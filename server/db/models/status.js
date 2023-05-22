const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, User }) {
      this.hasMany(Category, { foreignKey: "statusId" });
      this.hasMany(User, { foreignKey: "statusId" });
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
