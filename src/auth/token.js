const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = async (payload) => jwt.sign({ payload }, secret, jwtConfig);

module.exports = {
  createToken,
};