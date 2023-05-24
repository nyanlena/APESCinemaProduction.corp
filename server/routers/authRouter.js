const express = require("express");
const bcrypt = require("bcrypt");
const mailer = require("../mailer/mailer");
const { User } = require("../db/models");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashpass = await bcrypt.hash(password, 10);

    const [foundUser, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        password: hashpass,
      },
    });

    if (!created) return res.status(401).json({ message: "Email is in use" });

    req.session.user = {
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
    };

    const message = {
      to: req.body.email,
      subject: "Congratulations! You are successfully registered on our site!",
      html: `
      <h2>Поздравляем, Вы успешно зарегистрировались на нашем сайте!</h2>

      <p>Данное письмо не требует ответа.</p>
      `,
    };
    mailer(message);

    return res.json(foundUser);
  } catch (error) {
    console.log("Signup error!!!", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) return res.status(401).json({ message: "No such email" });

    if (await bcrypt.compare(password, foundUser.password)) {
      req.session.user = {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username,
      };
      return res.json(foundUser);
    }

    return res.status(401).json({ message: "Wrong password" });
  } catch (error) {
    console.log("Login error!!!", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.get("/logout", (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("user_sid");
    res.sendStatus(200);
  } catch (error) {
    console.log("Signup error!!!", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.get("/check", async (req, res) => {
  try {
    if (req.session?.user?.id) {
      return res.json(req.session.user);
    }
    return res.sendStatus(401);
  } catch (error) {
    console.log("Signup error!!!", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/signup/role", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { statusId } = req.body;
    console.log(statusId);
    const userId = req.session?.user.id; // Получаем ID пользователя из сессии
    console.log(userId);
    const hashpass = await bcrypt.hash(password, 10);

    const [foundUser, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        password: hashpass,
      },
    });

    if (!created) return res.status(401).json({ message: "Email is in use" });

    req.session.user = foundUser;

    const message = {
      to: req.body.email,
      subject: "Congratulations! You are successfully registered on our site!",
      html: `
      <h2>Поздравляем, Вы успешно зарегистрировались на нашем сайте!</h2>

      <p>Данное письмо не требует ответа.</p>
      `,
    };
    mailer(message);

    return res.json(foundUser);
  } catch (error) {
    console.log("Signup error!!!", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) return res.status(401).json({ message: "No such email" });

    if (await bcrypt.compare(password, foundUser.password)) {
      req.session.user = foundUser;
      return res.json(foundUser);
    }

    return res.status(401).json({ message: "Wrong password" });
  } catch (error) {
    console.log("Login error!!!", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.get("/logout", (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("user_sid");
    res.sendStatus(200);
  } catch (error) {
    console.log("Signup error!!!", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.get("/check", async (req, res) => {
  try {
    if (req.session?.user?.id) {
      return res.json(req.session.user);
    }
    return res.sendStatus(401);
  } catch (error) {
    console.log("Signup error!!!", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/signup/role", async (req, res) => {
  try {
    const { statusId } = req.body;
    console.log(statusId);
    const userId = req.session?.user.id; // Получаем ID пользователя из сессии
    console.log(userId);
    // Находим пользователя по его ID
    const user = await User.findByPk(userId);

    if (!user) {
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
