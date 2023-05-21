const express = require('express');
const { User, Category } = require('../db/models');
const { Op } = require('sequelize');

const seachRouter = express.Router();

seachRouter.get('/projects', (req, res) => {
  res.json(200);
});

seachRouter.get('/profiles', async (req, res) => {
  try {
    const allProfiles = await User.findAll();
    res.json(allProfiles);
  } catch (error) {
    console.log('error!!!1', error);
  }
});

seachRouter.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.log('categories error!!!', error);
  }
});

seachRouter.post('/profiles', async (req, res) => {
  try {
    const { searchQuery } = req.body;

    if (!searchQuery || searchQuery.trim() === '') {
      const allProfiles = await User.findAll();
      return res.json(allProfiles);
    }
    const profiles = await User.findAll({
      where: {
        [Op.or]: [
          {
            firstName: { [Op.iLike]: `${searchQuery}` },
          },
          {
            lastName: { [Op.iLike]: `${searchQuery}` },
          },
          {
            patronymicname: { [Op.iLike]: `${searchQuery}` },
          },
        ],
      },
    });
    res.json(profiles);
  } catch (error) {
    console.log('error in search', error);
  }
});

seachRouter.get('/projects/:id', (req, res) => {
  res.json(200);
});

seachRouter.get('/profiles/:id', (req, res) => {
  res.json(200);
});

module.exports = seachRouter;
