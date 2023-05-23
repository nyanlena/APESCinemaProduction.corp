const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { User } = require('../db/models');

require('dotenv').config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/auth/google/callback',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(
  session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get(
  '/auth/google',
  passport.authenticate('google', {
    score: ['email', 'profile'],
  }),
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/auth/google/failure',
  }),
);

app.get('/auth/protected', isLoggedIn, (req, res) => {
  let name = req.user.displayName;
  res.send(`Hello ${name}`);
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Something went wrong!');
});
