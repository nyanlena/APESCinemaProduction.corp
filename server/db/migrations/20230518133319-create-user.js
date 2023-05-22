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
      password: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      patronymicname: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("now"),
      },
      city: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("now"),
      },
      age: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("now"),
      },
      img: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.fn("now"),
      },
      education: {
        type: Sequelize.TEXT,
        defaultValue: Sequelize.fn("now"),
      },
      experience: {
        type: Sequelize.TEXT,
        defaultValue: Sequelize.fn("now"),
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
      statusId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Statuses",
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
