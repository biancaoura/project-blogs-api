const { createToken } = require('../auth/token');
const { userService } = require('../services');
const httpStatus = require('../utils/httpStatus');

const getUsers = async (_req, res) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
};

const createUser = async (req, res) => {
  const { email } = req.body;

  const isUserDuplicated = await userService.getUserByEmail(email);

  if (isUserDuplicated) {
    return res.status(httpStatus.CONFLICT).json({ message: 'User already registered' });
  }

  const newUser = await userService.createUser(req.body);

  if (!newUser) throw Error;

  const token = await createToken(email);

  res.status(httpStatus.CREATED).json({ token });
};

module.exports = {
  getUsers,
  createUser,
};