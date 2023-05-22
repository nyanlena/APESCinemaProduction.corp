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
        defaultValue: null,
      },
      img: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      education: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      experience: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      aboutMe: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      linkPortfolio: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      phone: {
        type: Sequelize.STRING,
      },
      linkTg: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      linkInst: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      linkWA: {
        type: Sequelize.STRING,
        defaultValue: null,
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
