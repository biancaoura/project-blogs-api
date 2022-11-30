const { User } = require('../models');

const getUsers = () => User.findAll({ attributes: { exclude: ['password'] } });

const getUserByEmail = (email) => User.findOne({ where: { email } });

const getUserById = (id) => User.findByPk(id, { attributes: { exclude: ['password'] } });

const createUser = (body) => User.create(body);

module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  createUser,
};