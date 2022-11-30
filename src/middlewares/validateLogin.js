const Joi = require('joi');
const httpStatus = require('../utils/httpStatus');

const validateLogin = (body) =>
  Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(body);

module.exports = (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) { 
    return res.status(httpStatus.BAD_REQ).json({ message: 'Some required fields are missing' }); 
  }

  return next();
};