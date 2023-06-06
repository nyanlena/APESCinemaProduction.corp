const express = require("express");
const { Favorite } = require("../db/models");
// const isAuth = require("../middlewares/isAuth");

const addRouter = express.Router();

addRouter.get("/:projectId", async (req, res) => {
  const favorites = await Favorite.findAll({
    where: { fromId: req.session?.user.id },
  });
  console.log(favorites);
  res.json(favorites);
});

module.exports = addRouter;
