const express = require("express");
const { Project, User, Category, Chat } = require("../db/models");
// const isAuth = require("../middlewares/isAuth");

const projectRouter = express.Router();

projectRouter.get("/:id", async (req, res) => {
  try {
    const onepic = await Project.findAll({
      where: { id: req.params.id },
      include: [{ model: User, include: [{ model: Category }] }],
    });
    res.json(onepic);
  } catch (err) {
    console.log("error!!!1", err);
    res.status(500).json({ err: "Internal server error" });
  }
});

projectRouter.post("/:id", async (req, res) => {
  const { body, projectId } = req.body;
  try {
    const mess = await Chat.create({
      body,
      projectId,
      userId: req.session.user.id,
    });
    res.json(mess);
  } catch (err) {
    console.log("error!!!1", err);
    res.status(500).json({ err: "Internal server error" });
  }
});

projectRouter.patch("/:id", async (req, res) => {
  try {
    await Project.update(req.body, { where: { id: req.params.id } });
    const updateProj = await Project.findByPk(req.params.id);
    res.json(updateProj);
  } catch (err) {
    console.log("error!!!1", err);
    res.status(500).json({ err: "Internal server error" });
  }
});

module.exports = projectRouter;
