const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const store = require('session-file-store');
const passport = require('passport');
const helmet = require('helmet');
const authRouter = require('./routers/authRouter');
const pathMiddlewares = require('./middlewares/pathMiddlewares');
const mainRouter = require('./routers/mainRouter');
const profileRouter = require('./routers/profileRouter');
const seachRouter = require('./routers/seachRouter');
const searchRouter = require('./routers/searchRouter');
const favoriteRouter = require('./routers/favoriteRouter');
const orderRouter = require('./routers/orderRouter');
const projectRouter = require('./routers/projectRouter');
const nodemailerRouter = require('./routers/nodemailerRouter');
const api = require('./routers/api');
require('dotenv').config();

require('./auth/google');
require('./auth/passport');
require('./db/models/user');

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

app.use(session(sessionConfig));
app.use(morgan('dev'));
app.use(express.json());
app.use(pathMiddlewares);
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
// app.use("/api/lk", transactionRouter);

app.use('/', mainRouter);
app.use('/api/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/seach', seachRouter);
app.use('/search', searchRouter);
app.use('/projects', projectRouter);
app.use('/favorites', favoriteRouter);
app.use('/orders', orderRouter);
app.use('/api/v1', api);
app.use('/api/auth/login/forget', nodemailerRouter);

app.use((err, req, res, next) => {
  // logic
  console.log(err);
});

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
