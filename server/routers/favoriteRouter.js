const express = require('express');
const { User, Favorite } = require('../db/models');

const favoriteRouter = express.Router();

// favoriteRouter.get('/', async (req, res) => {
//   try {
//     const favorites = await User.findAll();
//     // favorites.status != favorites.status;
//     // await favorites.save();
//     res.json(favorites);
//   } catch (error) {
//     console.log('favorites error!!!', error);
//   }
// });

favoriteRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const fromId = req.session.user.id;
      const favorites = await Favorite.findAll({ where: { fromId }, include: ['Receiver'] });
      res.json(favorites.map((favorite) => favorite.Receiver));
    } catch (error) {
      console.error('favorites error!!!', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  .post(async (req, res) => {
    try {
      const { toId } = req.body;
      const newFavorite = await Favorite.create({
        fromId: req.session.user.id,
        toId,
      });
      const newFavoriteWithUsers = await Favorite.findOne({
        where: { id: newFavorite.id },
        include: ['Sender', 'Receiver'],
      });
      res.json(newFavoriteWithUsers);
    } catch (error) {
      console.log('Add to favorites error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

favoriteRouter.delete('/remove/:id', async (req, res) => {
  try {
    const { toId } = req.body;
    const fromId = req.session.user.id;
    const favoriteToRemove = await Favorite.findOne({ where: { fromid, toId } });
    if (!favoriteToRemove) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    await favoriteToRemove.destroy();
    res.json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.log('Remove from favorites error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = favoriteRouter;
