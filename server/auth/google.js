const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { User } = require('../db/models');

const GOOGLE_CALLBACK_URL = 'http://localhost:3001/api/v1/auth/google/callback';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    },
    async (request, accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        email: profile.emails[0].value,
        googleId: profile.id,
      };
      let user;
      try {
        user = await User.findOrCreate({
          where: { googleId: profile.id },
          defaults: defaultUser,
        });
        if (user && user[0]) {
          return cb(null, user[0]);
        } else {
          return cb(new Error('User not created'), null);
        }
      } catch (err) {
        console.log('Signup error with Google!!!: ', err);
        return cb(err, null);
      }
    },
  ),
);

passport.serializeUser((user, cb) => {
  console.log('Serializing user: ', user);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findOne({ where: { id } });
    console.log('DeSerialized user: ', user);
    cb(null, user);
  } catch (err) {
    console.log('Error deserializing: ', err);
    cb(err, null);
  }
});
