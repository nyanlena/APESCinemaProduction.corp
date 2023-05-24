const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../db/models");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const hashpass = await bcrypt.hash(password, 10);

  const [foundUser, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      password: hashpass,
    },
  });

  if (!created) return res.status(401).json({ message: "Email is in use" });

  req.session.user = foundUser;

  return res.json(foundUser);
});

// authRouter.post("/signup/modal", async (req, res) => {
//   const { firstName, lastName } = req.body;
//   const userId = req.session?.user?.id;

//   try {
//     const existingUser = await User.findOne({ where: { id: userId } });
//     console.log(req.body);
//     if (existingUser) {
//       return res.status(401).json({ message: "Email is already in use" });
//     }
//     const foundUser = await User.create({
//       firstName,
//       lastName,
//     });

//     return res.json(foundUser);
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return res.status(500).json({ message: "Error creating user" });
//   }
// });

authRouter.post("/signup/modal", async (req, res) => {
  const { firstName, lastName, categoryId } = req.body;

  try {
    const userId = req.session?.user?.id;
    const foundUser = await User.findByPk(userId);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    foundUser.firstName = firstName;
    foundUser.lastName = lastName;
    foundUser.categoryId = categoryId;
    await foundUser.save();

    return res.json(foundUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Error creating user" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ where: { email } });

  if (!foundUser) return res.status(401).json({ message: "No such email" });

  if (await bcrypt.compare(password, foundUser.password)) {
    req.session.user = foundUser;
    return res.json(foundUser);
  }

  return res.status(401).json({ message: "Wrong password" });
});

authRouter.get("/logout", (req, res) => {
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
  console.log(statusId, "oooooooo");
  const userId = req.session.user.id; // Получаем ID пользователя из сессии
  try {
    // Находим пользователя по его ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // if (user) {
    //   const user = await User.findOne(where: { userId, statusId },);
    //   const
    // }
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
