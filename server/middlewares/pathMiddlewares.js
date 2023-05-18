// eslint-disable-next-line import/prefer-default-export
export const pathMiddlewares = (req, res, next) => {
  res.locals.path = req.originalUrl;
  res.locals.user = req.session?.user;
  next();
};
