// const express = require("express");
// const passport = require("passport");

// const api = express.Router();

// api.use(
//   session({
//     secret: 'key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   }),
// );

// function isLoggedIn(req, res, next) {
//   req.user ? next() : res.sendStatus(401);
// }

// const successLoginUrl = "http://localhost:5173/signup/role";
// const errorLoginUrl = "http://localhost:3001/api/v1/login/error";

// api.get(
//   "/login/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// api.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureMessage: "Cannot login to Google, please try again later!",
//     failureRedirect: errorLoginUrl,
//     successRedirect: successLoginUrl,
//   }),
//   (req, res) => {
//     console.log("User: ", req.user);
//     res.send("Thank you for signing in!");
//   }
// );

// api.get('/auth/protected', isLoggedIn, (req, res) => {
//   let name = req.user.displayName;
//   res.send(`Hello ${name}`);
// });

// api.get("/login/error", (req, res) => {
//   res.send("Something went wrong!");
// });

// module.exports = api;
