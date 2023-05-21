const express = require('express');
const { User, Favorite } = require('../db/models');

const favoriteRouter = express.Router();

favoriteRouter.get('/', async (req, res) => {
  try {
    const favorites = await User.findAll();
    // favorites.status != favorites.status;
    // await favorites.save();
    res.json(favorites);
  } catch (error) {
    console.log('favorites error!!!', error);
  }
});

// favoriteRouter
//   .route('/')
//   .post(async (req, res) => {
//     const { receiverId } = req.body;
//     const newFavorite = await Favorite.create({
//       senderId: req.session.user.id,
//       receiverId,
//     });
//     const newFavoriteWithUsers = await Favorite.findOne({
//       where: { id: newFavorite.id },
//       include: ['Sender', 'Receiver'],
//     });
//     res.json(newFavoriteWithUsers);
//   })
//   .get(async (req, res) => {
//     const allFavorites = await Favorite.findAll({
//       include: ['Sender', 'Receiver'],
//     });
//     res.json(allFavorites);
//   });

module.exports = favoriteRouter;
