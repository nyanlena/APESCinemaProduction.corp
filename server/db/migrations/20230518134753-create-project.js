"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      endDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      address: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      genre: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      x: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("now"),
      },
      y: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("now"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Projects");
  },
};
