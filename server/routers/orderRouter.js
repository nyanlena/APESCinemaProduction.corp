const express = require("express");

const orderRouter = express.Router();

orderRouter.get("/", (req, res) => {
  res.json(200);
});

module.exports = orderRouter;
