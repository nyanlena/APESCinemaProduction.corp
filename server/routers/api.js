const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { User } = require('../db/models');

const api = express.Router();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const successLoginUrl = 'http://localhost:5173/signup/role';
const errorLoginUrl = 'http://localhost:3001/api/v1/login/error';

api.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }),
);

api.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot login to Google, please try again later!',
    failureRedirect: errorLoginUrl,
  }),
  (req, res) => {
    req.login(req.user, async (err) => {
      if (err) {
        console.error('Error logging in: ', err);
        return res.redirect(errorLoginUrl);
      }
      req.session.user = req.user;
      const userLogged = await User.findOne({ where: { googleId: req.user.googleId } });
      if (userLogged.firstName) {
        res.redirect('http://localhost:5173/');
      } else {
        res.redirect(successLoginUrl);
      }
    });
  },
);

api.get('/auth/protected', isLoggedIn, (req, res) => {
  let name = req.user.displayName;
  res.send(`Hello ${name}`);
});

api.get('/login/error', (req, res) => {
  res.send('Something went wrong!');
});

module.exports = api;
