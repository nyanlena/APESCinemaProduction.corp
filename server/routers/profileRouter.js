const express = require("express");
const { User } = require("../db/models");

const profileRouter = express.Router();

// profileRouter.get("/", async (req, res) => {
//   try {
//     const myUser = await User.findByPk(req.session.id);
//     return res.json(myUser);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Failed to fetch profile data" });
//   }
// });

profileRouter.get("/api/:id", async (req, res) => {
  try {
    const foundUser = await User.findByPk(req.params.id);
    return res.json(foundUser);
  } catch (error) {
    console.log(error);
  }
});
profileRouter.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await user.update(req.body);
    return res.json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to update profile data" });
  }
});

profileRouter
  .route("/setting")
  .get(async (req, res) => {
    try {
      const userSetting = await User.findByPk(req.session.id);
      return res.json(userSetting);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to fetch user settings" });
    }
  })
  .post(async (req, res) => {
    try {
      const setting = await User.update(req.body, {});
      return res.json(setting);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to update user settings" });
    }
  });

module.exports = profileRouter;
