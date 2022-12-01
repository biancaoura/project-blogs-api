const { createToken } = require('../auth/token');
const getUserId = require('../helpers/getUserId');
const { userService } = require('../services');
const httpStatus = require('../utils/httpStatus');

const getUsers = async (_req, res) => {
  const users = await userService.getUsers();
  res.status(httpStatus.OK).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'User does not exist' });
  }

  res.status(httpStatus.OK).json(user);
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

const deleteUser = async (req, res) => {
  const userId = await getUserId(req.decoded.payload);

  await userService.deleteUser(userId);
  
  res.status(httpStatus.NO_CONTENT).end();
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
};