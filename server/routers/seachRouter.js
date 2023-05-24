const express = require("express");
const { Project, User, ProjectUser } = require("../db/models");
const isAuth = require("../middlewares/isAuth");
// const isRole = require("../middlewares/isRole");

const seachRouter = express.Router();

seachRouter.get("/projects", isAuth, async (req, res) => {
  try {
    const allPosts = await Project.findAll({
      order: [["createdAt", "DESC"]],
      include: [{ model: User }],
    });
    console.log(allPosts);
    res.json(allPosts);
  } catch (err) {
    console.log("error!!!1", err);
    res.status(500).json({ err: "Internal server error" });
  }
});

seachRouter.post("/projects", async (req, res) => {
  try {
    const newPost = await Project.create({
      ...req.body,
      userId: req.session.user.id,
    });
    await ProjectUser.create({
      userId: req.session.user.id,
      projectId: newPost.id,
    });
    console.log(newPost);
    res.json(newPost);
  } catch (err) {
    console.log("error!!!1", err);
    res.status(500).json({ err: "Internal server error" });
  }
});

module.exports = seachRouter;
