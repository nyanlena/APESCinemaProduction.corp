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
      "Projects",
      [
        {
          startDate: null,
          endDate: null,
          address: "Москва, Битцевский парк, 117525",
          name: "Риса Убийца",
          genre: "Ужастик",
          userId: 1,
          x: null,
          y: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Projects", null, {});
  },
};
