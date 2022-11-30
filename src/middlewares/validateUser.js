const Joi = require('joi');
const httpStatus = require('../utils/httpStatus');

const validateUser = (body) =>
  Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
  }).validate(body);

module.exports = (req, res, next) => {
  const { error } = validateUser(req.body);

  if (error) {
    return res.status(httpStatus.BAD_REQ).json({ message: error.message });
  }

  return next();
};