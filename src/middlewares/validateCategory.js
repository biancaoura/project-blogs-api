const httpStatus = require('../utils/httpStatus');

module.exports = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(httpStatus.BAD_REQ).json({ message: '"name" is required' });

  return next();
};