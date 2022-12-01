const errorHandling = require('./errorHandling');
const validateToken = require('./validateToken');
const validateLogin = require('./validateLogin');
const validateUser = require('./validateUser');
const validateCategory = require('./validateCategory');
const validatePostCreation = require('./validatePostCreation');
const validatePostUpdate = require('./validatePostUpdate');

module.exports = {
  errorHandling,
  validateToken,
  validateLogin,
  validateUser,
  validateCategory,
  validatePostCreation,
  validatePostUpdate,
};