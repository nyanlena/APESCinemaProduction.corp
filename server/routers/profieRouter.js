const express = require("express");

const profieRouter = express.Router();

profieRouter.get("/", (req, res) => {
  res.json(200);
});

module.exports = profieRouter;
