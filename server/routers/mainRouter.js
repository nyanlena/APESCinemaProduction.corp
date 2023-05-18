const express = require("express");

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
  res.json(200);
});

module.exports = mainRouter;
