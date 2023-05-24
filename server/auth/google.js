// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const { User } = require('../db/models');

// const GOOGLE_CALLBACK_URL = 'http://localhost:3001/api/v1/auth/google/callback';

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: GOOGLE_CALLBACK_URL,
//       passReqToCallback: true,
//       scope: ['profile', 'email'],
//     },
//     async (request, accessToken, refreshToken, profile, cb) => {
//       const defaultUser = {
//         email: profile.emails[0].value,
//         googleId: profile.id,
//       };
//       const user = await User.findOrCreate({
//         where: { googleId: profile.id },
//         defaults: defaultUser,
//       }).catch((err) => {
//         console.log('Signup error with Google!!!: ', err);
//         cb(err, null);
//       });
//       if (user && user[0]) return cb(null, user && user[0]);
//     },
//   ),
// );

// passport.serializeUser((user, cb) => {
//   console.log('Serializing user: ', user);
//   cb(null, user.id);
// });

// passport.deserializeUser(async (id, cb) => {
//   const user = await User.findOne({ where: { id } }).catch((err) => {
//     console.log('Error deserializing: ', err);
//     cb(err, null);
//   });
//   console.log('DeSerialized user: ', user);
//   if (user) cb(null, user);
// });
