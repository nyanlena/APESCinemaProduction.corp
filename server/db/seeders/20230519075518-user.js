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
          img: "https://sun9-44.userapi.com/impg/7B2AJW9bHAONX-sr3p6HgEAH0BeLra6muymuJg/Q0xxMy9AbsI.jpg?size=1078x1627&quality=95&sign=6da8eec2b24cbe7b93525527c06dea8e&type=album",
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
          img: "https://sun9-26.userapi.com/impg/UAnh4Ckd9eqlx5ag0RbH46M9Np7pKIpENrJ7wA/UFMkMI0jmJQ.jpg?size=1620x2160&quality=95&sign=625fd3906a115ee4d74f859056c118ab&type=album",
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
          email: "1@1",
          password: userpass1,
          firstName: "Найыр",
          lastName: "Рисов",
          patronymicname: "Рисович",
          city: "Китай",
          age: "28",
          img: "https://sun9-42.userapi.com/impg/5Wgf44Kbt3UfkeGKzTF-KHQ2jfJKV3tahgMeuA/CUmYYq4vjyU.jpg?size=960x1280&quality=95&sign=3bf998f54001fe1141922cb8a55144b0&type=album",
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
          img: "https://sun9-77.userapi.com/impg/aIEG9QXHC1vbIMFp1cT4DCNQ4mfPJb7sVc3K2g/pn42JxCs4Ps.jpg?size=1266x1688&quality=95&sign=8de5b580e233f8b73710ebada32b1c84&type=album",
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
          img: "https://sun9-74.userapi.com/impg/4qvNo4G932wK_p_Rs_Fw57xFbaIDfx9teSqpVg/zKmpRUtUDPc.jpg?size=960x1280&quality=95&sign=b735539d5a29f3747808dae2eff9b758&type=album",
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
          img: "https://sun9-5.userapi.com/impg/x4mUkMv0Q5XKzS0rDzu8kiF98qTzejX2C0drPg/yI9jbjdIUcA.jpg?size=960x1280&quality=95&sign=34ce7acb689eb4769356320ab26e7a9b&type=album",
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
          firstName: "Светочка",
          lastName: "Николаева",
          patronymicname: null,
          city: "Москва",
          age: "25",
          img: "https://sun9-7.userapi.com/impg/R1UwlHIenJ5WRVC_NWfi320UCLUh1W9FikPK_Q/B-hITHIHTQ0.jpg?size=1065x1074&quality=95&sign=fde6b9a6d8da0a29f25d42f1a32dfb5c&type=album",
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
          img: "https://sun9-40.userapi.com/impg/Zw6cgpkfCbwZGykBxtqFm3Gyewzg6bRR0wg1qA/YCfIZdisQGk.jpg?size=1156x1280&quality=95&sign=2f5f66d09f3709a8624efadc6863bff2&type=album",
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
