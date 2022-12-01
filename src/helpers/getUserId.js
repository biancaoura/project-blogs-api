const { userService } = require('../services');

module.exports = async (email) => {
  const userData = await userService.getUserByEmail(email);
  return userData.dataValues.id;
};