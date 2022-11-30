const { User } = require('../models');

const getUserByEmail = (email) => User.findOne({ where: { email } });

const createUser = (body) => User.create(body);

module.exports = {
  getUserByEmail,
  createUser,
};