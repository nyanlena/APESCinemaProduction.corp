const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const notAuth = require("../middlewares/notAuth");
const isAuth = require("../middlewares/isAuth");

const authRouter = express.Router();

authRouter.post("/signup", notAuth, async (req, res) => {
  const { email, password } = req.body;

  const hashpass = await bcrypt.hash(password, 10);

  const [foundUser, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      password: hashpass,
      statusId: null,
    },
  });

  if (!created) return res.status(401).json({ message: "Email is in use" });

  req.session.user = foundUser;
  console.log(req.session.user);

  return res.json(foundUser);
});

authRouter.post("/login", notAuth, async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ where: { email } });

  if (!foundUser) return res.status(401).json({ message: "No such email" });

  if (await bcrypt.compare(password, foundUser.password)) {
    req.session.user = foundUser;
    return res.json(foundUser);
  }

  return res.status(401).json({ message: "Wrong password" });
});

authRouter.get("/logout", isAuth, (req, res) => {
  req.session.destroy();
  res.clearCookie("user_sid");
  res.sendStatus(200);
});

authRouter.get("/check", async (req, res) => {
  if (req.session?.user?.id) {
    return res.json(req.session.user);
  }
  return res.sendStatus(401);
});

authRouter.post("/signup/role", async (req, res) => {
  const { statusId } = req.body;
  console.log(statusId);
  const userId = req.session.user.id; // Получаем ID пользователя из сессии
  try {
    // Находим пользователя по его ID
    const user = await User.findByPk(userId);

    if (!user && user.statusId === null) {
      return res.status(404).json({ message: "User not found" });
    }

    // Устанавливаем выбранную роль пользователю
    user.statusId = statusId;
    await user.save();

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = authRouter;
