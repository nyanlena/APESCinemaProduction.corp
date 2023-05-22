const express = require("express");
const { Project } = require("../db/models");

const projectRouter = express.Router();

projectRouter.get("/:id", async (req, res) => {
  const onepic = await Project.findAll({ where: { id: req.params.id } });
  res.json(onepic);
});

projectRouter.patch("/:id", async (req, res) => {
  await Project.update(req.body, { where: { id: req.params.id } });
  const updateProj = await Project.findByPk(req.params.id);
  res.json(updateProj);
});

module.exports = projectRouter;
