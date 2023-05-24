function isRole(req, res, next) {
  if (req.session?.user?.statusId === null) {
    console.log(req.session?.user?.statusId);
    return next();
  }
  return res.status(301).redirect("/");
}
module.exports = isRole;
