const httpStatus = require('../utils/httpStatus');
const { userService } = require('../services');
const { createToken } = require('../auth/token');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(httpStatus.BAD_REQ).json({ message: 'Invalid fields' });
  }

  const token = await createToken(email);

  res.status(httpStatus.OK).json({ token });
};