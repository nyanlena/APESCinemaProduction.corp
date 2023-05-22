/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const adminpass = await bcrypt.hash("123", 10);
    const userpass = await bcrypt.hash("321", 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "lenamms@yandex.ru",
          password: adminpass,
          firstName: "Рита",
          lastName: "Корж",
          patronymicname: "Андреевна",
          city: "Москва",
          age: "25",
          img: "https://sun9-44.userapi.com/impg/7B2AJW9bHAONX-sr3p6HgEAH0BeLra6muymuJg/Q0xxMy9AbsI.jpg?size=1078x1627&quality=95&sign=6da8eec2b24cbe7b93525527c06dea8e&type=album",
          education: "Бауманка, Арка",
          experience: "большой",
          aboutMe: "кек",
          linkPortfolio: "ооооооо",
          phone: "89260900674",
          linkTg: "https://t.me/bloody_maggie",
          linkInst:
            "https://instagram.com/bloody_maggie?igshid=NTc4MTIwNjQ2YQ==",
          linkWA: null,
          categoryId: 1,
          statusId: 1,
        },
        {
          email: "ainaomuk@gmail.com",
          password: userpass,
          firstName: "Елена",
          lastName: "Корж",
          patronymicname: "Владимировна",
          city: "Москва",
          age: "25",
          img: "https://sun9-26.userapi.com/impg/UAnh4Ckd9eqlx5ag0RbH46M9Np7pKIpENrJ7wA/UFMkMI0jmJQ.jpg?size=1620x2160&quality=95&sign=625fd3906a115ee4d74f859056c118ab&type=album",
          education: "МИРЭА, Эльбрус",
          experience: "большой!!!",
          aboutMe: "классная актриска",
          linkPortfolio: "смотрите инстик",
          phone: "89264779489",
          linkTg: "https://t.me/liemelzz",
          linkInst: "https://instagram.com/nyanlena?igshid=NTc4MTIwNjQ2YQ==",
          linkWA: null,
          categoryId: 6,
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
     * await queryInterface.bulkDelete('Users', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
