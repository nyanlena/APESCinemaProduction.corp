const express = require("express");
const { Project, User } = require("../db/models");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

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

seachRouter.post("/projects", isAuth, isAdmin, async (req, res) => {
  try {
    const newPost = await Project.create({
      ...req.body,
      userId: req.session.user.id,
    });
    res.json(newPost);
  } catch (err) {
    console.log("error!!!1", err);
    res.status(500).json({ err: "Internal server error" });
  }
});

module.exports = seachRouter;
