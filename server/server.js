const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const store = require('session-file-store');
const authRouter = require('./routers/authRouter');
const pathMiddlewares = require('./middlewares/pathMiddlewares');
const mainRouter = require('./routers/mainRouter');
const profileRouter = require('./routers/profileRouter');
const seachRouter = require('./routers/seachRouter');
const searchRouter = require('./routers/searchRouter');
const favoriteRouter = require('./routers/favoriteRouter');
const orderRouter = require('./routers/orderRouter');
const projectRouter = require('./routers/projectRouter');
require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth2').Strategy;
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

const app = express();
// require('./google/auth');
const PORT = process.env.PORT || 3001;

const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

app.use(
  session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(session(sessionConfig));
app.use(morgan('dev'));
app.use(express.json());
app.use(pathMiddlewares);

// app.use("/api/lk", transactionRouter);

app.use('/', mainRouter);
app.use('/api/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/seach', seachRouter);
app.use('/search', searchRouter);
app.use('/projects', projectRouter);
app.use('/favorites', favoriteRouter);
app.use('/orders', orderRouter);
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

app.use((err, req, res, next) => {
  // logic
  console.log(err);
});

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
