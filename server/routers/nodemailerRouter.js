const express = require('express');
const bcrypt = require('bcrypt');
const { sendEmail, generateCodeWord } = require('../mailer/mailer');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../db/models');

const nodeMailerRouter = express.Router();

nodeMailerRouter.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(404);
    }

    const uuid = uuidv4();

    user.uuid = uuid;
    await user.save();

    const userEmail = user.get('email');

    if (user && userEmail) {
      console.log(`Sending email to: ${userEmail}`);
      sendEmail(user, uuid);
      return res.sendStatus(200);
    } else {
      console.log('User email not defined:', user);
      return res.status(400).send('User email not defined');
    }
  } catch (error) {
    console.log('Nodemailer post error:', error);
    res.status(500).json({ e: 'Internal server error' });
  }
});

nodeMailerRouter.post('/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;

    const checkUUID = await User.findOne({ where: { uuid: uuid } });
    if (checkUUID) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log('Nodemailer uuid error:', error);
    res.status(500).json({ e: 'Internal server error' });
  }
});

nodeMailerRouter.post('/new-password/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;
    const { codeword, password } = req.body;
    const founduuid = await User.findOne({ where: { uuid } });
    if (!founduuid) {
      return res.sendStatus(401);
    }

    if (founduuid.codeword !== codeword) {
      return res.sendStatus(401);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    founduuid.password = hashedPassword;
    founduuid.codeword = null;
    await founduuid.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log('New-password nodemailer:', error);
    res.status(500).json({ e: 'Internal server error' });
  }
});

module.exports = nodeMailerRouter;
