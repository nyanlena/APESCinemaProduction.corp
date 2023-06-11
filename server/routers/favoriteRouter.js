const express = require('express');
const { User, Favorite } = require('../db/models');
const { mailer } = require('../mailer/mailer');

const favoriteRouter = express.Router();

favoriteRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const fromId = req.session.user.id;
      const favorites = await Favorite.findAll({
        where: { fromId },
        include: ['Receiver'],
      });
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
    const toId = req.params.id; // вместо const { toId } = req.body;
    const fromId = req.session.user.id;
    const favoriteToRemove = await Favorite.findOne({
      where: { fromId, toId },
    });
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

favoriteRouter.post('/send', async (req, res) => {
  try {
    const { email, contactInfo } = req.body;
    const message = {
      to: email,
      subject: 'Заявка на участие в проекте',
      html: `
        <h2>Здравствуйте! Хотели бы вы поучаствовать в нашем проекте?</h2>
        <p>Контактные данные: ${contactInfo}</p>
      `,
    };

    mailer(message);

    res.json({ message: 'Сообщение успешно отправлено' });
  } catch (error) {
    console.error('Ошибка при отправке сообщения', error);
    res.status(500).json({ error: 'Ошибка при отправке сообщения' });
  }
});

favoriteRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, status } = req.body;
    let favorite = await Favorite.findOne({ where: { fromId: userId, toId: id } });
    if (!favorite) {
      favorite = await Favorite.create({ fromId: userId, toId: id, status: false });
    }
    favorite.status = status;
    await favorite.save();
    res.json({ message: 'Статус успешно обновлен' });
  } catch (error) {
    console.error('Ошибка при обновлении статуса', error);
    res.status(500).json({ error: 'Ошибка при обновлении статуса' });
  }
});

favoriteRouter.get('/check/:id', async (req, res) => {
  try {
    const toId = req.params.id;
    const fromId = req.session.user.id;
    const favoriteToCheck = await Favorite.findOne({
      where: { fromId, toId },
    });

    if (favoriteToCheck) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.log('Check favorites error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = favoriteRouter;
