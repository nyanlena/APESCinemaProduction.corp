const express = require("express");
const multer = require("multer");
const { User, Category } = require("../db/models");
const isAuth = require("../middlewares/isAuth");

const profileRouter = express.Router();

profileRouter.get("/setting", isAuth, async (req, res) => {
  try {
    const userSetting = await User.findByPk(req.session.user.id);
    return res.json(userSetting);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch user settings" });
  }
});
profileRouter.get("/:id", isAuth, async (req, res) => {
  try {
    const foundUser = await User.findByPk(req.params.id, {
      include: Category,
    });
    if (foundUser) {
      return res.json(foundUser);
    }
    return res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to fetch profile data" });
  }
});

profileRouter.patch("/api/:id", isAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const updatedUser = await user.update(req.body);
    console.log(updatedUser, "kfkfjnfrkvnjknvzd");
    return res.json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to update profile data" });
  }
});

profileRouter.patch("/setting", isAuth, async (req, res) => {
  try {
    const foundUser = await User.findByPk(req.session.user.id);
    if (!foundUser) {
      res.status(404).json({ message: "User not found" });
    }
    const {
      email,
      firstName,
      lastName,
      patronymicname,
      age,
      city,
      phone,
      linkTg,
      linkInst,
      linkWA,
      img,
    } = req.body;

    if (!(email && phone && firstName && lastName && age && city))
      return res.status(409);

    await foundUser.update(req.body);

    return res.json(foundUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to update user settings" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// profileRouter.route('/image').post(upload.single('img'), isAuth, async (req, res) => {
//   try {
//     const foundUser = await User.findByPk(req.session.user.id);
//     if (!foundUser) {
//       res.status(404).json({ message: 'User not found' });
//     }
//     const image = req.file.filename;
//     await foundUser.update({ img: image });
//     return res.json(foundUser);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: 'Image to update user settings' });
//   }
// });
profileRouter
  .route("/image")
  .post(upload.single("img"), isAuth, async (req, res) => {
    console.log(req.file, "jjjjjjjjjghvufdjvhbejfngk");
    try {
      const foundUser = await User.findByPk(req.session.user.id);
      const types = ["image/png", "image/jpeg", "image/jpg"];
      if (!foundUser) {
        res.status(404).json({ message: "User not found" });
      } else if (!types.includes(req.file.mimetype)) {
        res.status(405).json({ message: "Wrong file type" });
      } else {
        const image = req.file.filename;
        console.log(req.file.mimetype, "fffffbhjfdvnk");
        await foundUser.update({ img: image });
        return res.json(foundUser);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Image to update user settings" });
    }
  });

module.exports = profileRouter;
