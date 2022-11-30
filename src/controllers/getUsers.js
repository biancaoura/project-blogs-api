const { userService } = require('../services');

module.exports = async (_req, res) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
};