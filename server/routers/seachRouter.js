const express = require("express");
const { Project } = require("../db/models");

const seachRouter = express.Router();

seachRouter.get("/projects", async (req, res) => {
  const allPosts = await Project.findAll({
    order: [["createdAt", "DESC"]],
    // include: User,
  });
  res.json(allPosts);
});

seachRouter.post("/projects", async (req, res) => {
  const newPost = await Project.create({
    ...req.body,
    userId: req.session.user.id,
  });
  res.json(newPost);
});

seachRouter.get("/profiles", (req, res) => {
  res.json(200);
});

seachRouter.get("/profiles/:id", (req, res) => {
  res.json(200);
});

module.exports = seachRouter;
