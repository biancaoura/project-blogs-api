const Joi = require('joi');
const jwt = require('jsonwebtoken');
const httpStatus = require('../utils/httpStatus');
const { userService } = require('../services');

const { JWT_SECRET } = process.env;

const validateLogin = (body) =>
  Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(body);

module.exports = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) { 
    return res.status(httpStatus.BAD_REQ).json({ message: 'Some required fields are missing' }); 
  }

  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(httpStatus.BAD_REQ).json({ message: 'Invalid fields' });
  }

  const payload = { email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  
  res.status(httpStatus.OK).json({ token });
};