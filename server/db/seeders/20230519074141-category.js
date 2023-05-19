/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          title: "Режиссёр",
          statusId: 1,
        },
        {
          title: "Продюсер",
          statusId: 1,
        },
        {
          title: "Фотограф",
          statusId: 1,
        },
        {
          title: "Клипмейкер",
          statusId: 1,
        },
        {
          title: "Режиссёр-постановщик",
          statusId: 1,
        },
        {
          title: "Актёр",
          statusId: 2,
        },
        {
          title: "Художник-постановщик",
          statusId: 2,
        },
        {
          title: "Оператор",
          statusId: 2,
        },
        {
          title: "Стилист",
          statusId: 2,
        },
        {
          title: "Гримёр",
          statusId: 2,
        },
        {
          title: "Светооператор",
          statusId: 2,
        },
        {
          title: "Монтажёр",
          statusId: 2,
        },
        {
          title: "Звукорежиссёр",
          statusId: 2,
        },
        {
          title: "Модель",
          statusId: 2,
        },
        {
          title: "Сценарист",
          statusId: 2,
        },
        {
          title: "Каскадёр",
          statusId: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Categories', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
