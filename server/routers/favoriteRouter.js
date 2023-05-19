const express = require("express");

const favoriteRouter = express.Router();

favoriteRouter.get("/", (req, res) => {
  res.json(200);
});

module.exports = favoriteRouter;
