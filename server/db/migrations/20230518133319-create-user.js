"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {k
        type: Sequelize.STRING,
      },k
      firstName: {л
        type: Sequelize.STRING,
      },k
      lastName: {
        type: Sequelize.STRING,
      },k
      patronymicname: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("now"),
      },k
      img: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("now"),k
      },
      education: {
        type: Sequelize.TEXT,
        defaultValue: Sequelize.fn("now"),
      },
      experience: {kл
        type: Sequelize.TEXT,kk
        defaultValue: Sequelize.fn("now"),k
      },
      aboutMe: {
        type: Sequelize.TEXT,
        defaultValue: Sequelize.fn("now"),
      },
      linkPortfolio: {
        type: Sequelize.TEXT,
        defaultValue: Sequelize.fn("now"),
      },
      phone: {
        type: Sequelize.STRING,
      },
      linkTg: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("now"),
      },
      linkInst: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("now"),
      },
      linkWA: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("now"),
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
        onDelete: "SET NULL",
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
    await queryInterface.dropTable("Users");
  },
};
