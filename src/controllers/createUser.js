const Joi = require('joi');
const { createToken } = require('../auth/token');
const { userService } = require('../services');
const httpStatus = require('../utils/httpStatus');

const validateUserSchema = (body) =>
  Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
  }).validate(body);

module.exports = async (req, res) => {
  const { error } = validateUserSchema(req.body);
  
  if (error) {
    return res.status(httpStatus.BAD_REQ).json({ message: error.message });
  }

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