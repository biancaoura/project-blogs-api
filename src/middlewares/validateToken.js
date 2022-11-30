const { validateToken } = require('../auth/token');
const httpStatus = require('../utils/httpStatus');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  const decoded = validateToken(token);

  if (!decoded) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }

  req.decoded = decoded;
  return next();
};