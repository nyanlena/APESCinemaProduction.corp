/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const adminpass = await bcrypt.hash("123", 10);
    const userpass = await bcrypt.hash("321", 10);
    const userpass1 = await bcrypt.hash("321", 10);
    const userpass2 = await bcrypt.hash("321", 10);
    const userpass3 = await bcrypt.hash("321", 10);
    const userpass4 = await bcrypt.hash("321", 10);
    const userpass5 = await bcrypt.hash("321", 10);
    const userpass6 = await bcrypt.hash("321", 10);
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
          img: "Q0xxMy9AbsI.jpg",
          education: "Бауманка, Арка",
          experience: "большой",
          aboutMe: "кек",
          userPortfolio: "ооооооо",
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
          img: "ооотот.jpg",
          education: "МИРЭА, Эльбрус",
          experience: "большой!!!",
          aboutMe: "классная актриска",
          userPortfolio: "смотрите инстик",
          phone: "89264779489",
          linkTg: "https://t.me/liemelzz",
          linkInst: "https://instagram.com/nyanlena?igshid=NTc4MTIwNjQ2YQ==",
          linkWA: null,
          categoryId: 6,
          statusId: 2,
        },
        {
          email: "vi.vi.1998@list.ru",
          password: userpass1,
          firstName: "Найыр",
          lastName: "Рисов",
          patronymicname: "Рисович",
          city: "Китай",
          age: "28",
          img: "CUmYYq4vjyU.jpg",
          education: "Эльбрус",
          experience: "работа на рисовых плантациях",
          aboutMe: "профессиональный каскадер, Китаец",
          userPortfolio: "оооо",
          phone: "89104524609",
          linkTg: null,
          linkInst: null,
          linkWA: null,
          categoryId: 16,
          statusId: 2,
        },
        {
          email: "2@2",
          password: userpass2,
          firstName: "Варгес",
          lastName: "Чархифалакян",
          patronymicname: null,
          city: "Дубай",
          age: "31",
          img: "pn42JxCs4Ps.jpg",
          education: "Эльбрус",
          experience: "элитная съемка",
          aboutMe:
            "профессиональный фотограф и просто красивый армянский парень",
          userPortfolio: "инстаграм",
          phone: "87777777777",
          linkTg: "https://t.me/vcharh",
          linkInst: null,
          linkWA: null,
          categoryId: 3,
          statusId: 1,
        },
        {
          email: "3@3",
          password: userpass3,
          firstName: "Паша",
          lastName: "Захаров",
          patronymicname: "Сергеевич",
          city: "Москва",
          age: "28",
          img: "2023-05-23 15.23.40.jpg",
          education: "Эльбрус",
          experience: "инженер, китайский и японский языки в совершенстве",
          aboutMe: "отличный парень, выберете меня!РИСА!!!!",
          userPortfolio: "оооооооо",
          phone: "89993978657",
          linkTg: "https://t.me/space_ii",
          linkInst: null,
          linkWA: null,
          categoryId: 12,
          statusId: 2,
        },
        {
          email: "4@4",
          password: userpass4,
          firstName: "Аина",
          lastName: "Омукова",
          patronymicname: null,
          city: "Якутия",
          age: "25",
          img: "2023-05-23 15.23.45.jpg",
          education: "ВШЭ",
          experience: "оченЯ большая опыт ТЯЯЯЯЯЯ",
          aboutMe: "дженерика в сердце!",
          userPortfolio: "дддддддд",
          phone: "89993879728",
          linkTg: "https://t.me/ainav8",
          linkInst: null,
          linkWA: null,
          categoryId: 7,
          statusId: 2,
        },
        {
          email: "5@5",
          password: userpass5,
          firstName: "Светлана",
          lastName: "Николаева",
          patronymicname: null,
          city: "Москва",
          age: "25",
          img: "B-hITHIHTQ0.jpg",
          education: "МГУ",
          experience: "сьемка в рекламе энергетиков",
          aboutMe:
            "просто прекрасная девушка, СОМНИТЕЛЬНЫЕ ПРОЕКТЫ НЕ ПРЕДЛАГАТЬ!!",
          userPortfolio: "ллллллллллл",
          phone: "89993879728",
          linkTg: "https://t.me/s_arsyn",
          linkInst: null,
          linkWA: null,
          categoryId: 14,
          statusId: 2,
        },
        {
          email: "6@6",
          password: userpass6,
          firstName: "Алена",
          lastName: "Крупенникова",
          patronymicname: null,
          city: "Москва",
          age: "24",
          img: "YCfIZdisQGk.jpg",
          education: "МГУ",
          experience: "очень большой",
          aboutMe: "самая красивая",
          userPortfolio: "ллллллллллл",
          phone: "89998135098",
          linkTg: "https://t.me/krupeshaaa",
          linkInst: null,
          linkWA: null,
          categoryId: 10,
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
