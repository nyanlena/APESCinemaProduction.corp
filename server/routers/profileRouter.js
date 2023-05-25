const express = require("express");
const { User, Category } = require("../db/models");
const fileMiddleware = require("../middlewares/multer");

const profileRouter = express.Router();

profileRouter.get("/setting", async (req, res) => {
  try {
    const userSetting = await User.findByPk(req.session.user.id);
    return res.json(userSetting);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch user settings" });
  }
});
profileRouter.get("/image", async (req, res) => {
  try {
    const userSetting = await User.findByPk(req.session.user.id);
    return res.json(userSetting);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch user settings" });
  }
});
profileRouter.get("/:id", async (req, res) => {
  try {
    const foundUser = await User.findByPk(req.params.id, {
      include: Category,
    });
    if (foundUser) {
      return res.json(foundUser);
    }
    return res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to fetch profile data" });
  }
});

profileRouter.patch("/api/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // console.log(req.body,'kfkfjnfrkvnjknvzd');
    const updatedUser = await user.update(req.body);
    return res.json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to update profile data" });
  }
});

profileRouter.patch("/setting", async (req, res) => {
  try {
    const foundUser = await User.findByPk(req.session.user.id);
    if (!foundUser) {
      res.status(404).json({ message: "User not found" });
    }
    const {
      email,
      firstName,
      lastName,
      patronymicname,
      age,
      city,
      phone,
      linkTg,
      linkInst,
      linkWA,
      img,
    } = req.body;

    if (!(email && phone && firstName && lastName && age && city))
      return res.status(409);

    await foundUser.update(req.body);

    return res.json(foundUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to update user settings" });
  }
});

profileRouter.post(
  "/image",
  fileMiddleware.single("avatar"),
  async (req, res) => {
    try {
      // console.log("asdasdasdasd", req.file);
      // console.log("asdasdasdasd222", req.body);
      // return res.sendStatus(200);
      // const { id } = req.session;
      const foundUser = await User.findByPk(req.session.user.id);
      if (!foundUser) {
        res.status(404).json({ message: "User not found" });
      }
      const image = req.file.path;
      console.log(image);
      await foundUser.update({ img: image });
      return res.json(foundUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Image to update user settings" });
    }
  }
);

module.exports = profileRouter;
