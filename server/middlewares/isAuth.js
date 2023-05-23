function isAuth(req, res, next) {
  if (req.session?.user?.id) {
    return next();
  }
  return res.sendStatus(403);
}
module.exports = isAuth;
