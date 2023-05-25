const express = require("express");
const { User, Chat } = require("../db/models");
// const isAuth = require("../middlewares/isAuth");

const chatRouter = express.Router();

chatRouter.get("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  try {
    const messages = await Chat.findAll({
      where: { projectId },
      include: [{ model: User }],
    });
    res.json(messages);
  } catch (err) {
    console.log("error!!!1", err);
    res.status(500).json({ err: "Internal server error" });
  }
});

module.exports = chatRouter;
