'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'fromId', as: 'Sender' });
      this.belongsTo(User, { foreignKey: 'toId', as: 'Receiver' });
    }
  }
  Favorite.init(
    {
      fromId: DataTypes.INTEGER,
      toId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Favorite',
    },
  );
  return Favorite;
};
