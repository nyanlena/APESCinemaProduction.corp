const express = require('express');
// const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const store = require('session-file-store');
const authRouter = require('./routers/authRouter');
const pathMiddlewares = require('./middlewares/pathMiddlewares');
const mainRouter = require('./routers/mainRouter');
const profileRouter = require('./routers/profileRouter');
const seachRouter = require('./routers/searchRouter');
const favoriteRouter = require('./routers/favoriteRouter');
const orderRouter = require('./routers/orderRouter');

// const transactionRouter = require("./routers/transactionsRouter");
require('dotenv').config();

const app = express();
require('./google/auth');
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
// app.use(
//   session({
//     secret: 'key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   }),
// );

app.use(session(sessionConfig));
app.use(morgan('dev'));
app.use(express.json());
app.use(pathMiddlewares);

// app.use("/api/lk", transactionRouter);
app.use('/', mainRouter);
app.use('/api/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/search', seachRouter);
app.use('/favorites', favoriteRouter);
app.use('/orders', orderRouter);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
