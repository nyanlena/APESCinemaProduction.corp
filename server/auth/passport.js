// const passport = require("passport");
// const passportJwt = require("passport-jwt");

// const { ExtractJwt } = passportJwt;
// const StrategyJwt = passportJwt.Strategy;
// const { User } = require("../db/models");

// passport.use(
//   new StrategyJwt(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET,
//     },
//     (jwtPayload, done) =>
//       User.findOne({ where: { id: jwtPayload.id } })
//         .then((user) => done(null, user))
//         .catch((err) => done(err))
//   )
// );
