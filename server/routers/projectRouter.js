const express = require("express");
const { Project, User, Category } = require("../db/models");
// const isAuth = require("../middlewares/isAuth");

const projectRouter = express.Router();

projectRouter.get("/:id", async (req, res) => {
  try {
    const onepic = await Project.findAll({
      where: { id: req.params.id },
      include: [{ model: User, include: [{ model: Category }] }],
    });
    console.log(onepic);
    res.json(onepic);
  } catch (err) {
    console.log("error!!!1", err);
    res.status(500).json({ err: "Internal server error" });
  }
});

projectRouter.patch("/:id", async (req, res) => {
  try {
    await Project.update(req.body, { where: { id: req.params.id } });
    const updateProj = await Project.findByPk(req.params.id);
    console.log(updateProj);
    res.json(updateProj);
  } catch (err) {
    console.log("error!!!1", err);
    res.status(500).json({ err: "Internal server error" });
  }
});

module.exports = projectRouter;
