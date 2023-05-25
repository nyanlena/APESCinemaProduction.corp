const express = require("express");

const seachRouter = express.Router();

seachRouter.get("/projects", (req, res) => {
  res.json(200);
});

seachRouter.get("/profiles", (req, res) => {
  res.json(200);
});

seachRouter.get("/projects/:id", (req, res) => {
  res.json(200);
});

seachRouter.get("/profiles/:id", (req, res) => {
  res.json(200);
});

module.exports = seachRouter;
