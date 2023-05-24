function isAdmin(req, res, next) {
  if (req.session?.user?.statusId === 1) {
    return next();
  }
  return res.sendStatus(403);
}
module.exports = isAdmin;
