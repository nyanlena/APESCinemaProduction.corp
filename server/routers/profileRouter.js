const express = require("express");
const { User } = require("../db/models");

const profileRouter = express.Router();

profileRouter.get("/:id", async (req, res) => {
  const oneUser = await User.findByPk(req.params.id);
  return res.json(oneUser);
});
profileRouter.get("/setting", async (req, res) => {
  const userSetting = await User.findByPk(req.session.id);
  return res.json(userSetting);
});
module.exports = profileRouter;
