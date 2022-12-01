const Joi = require('joi');
const httpStatus = require('../utils/httpStatus');

const validatePost = (body) => 
  Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate(body);

module.exports = (req, res, next) => {
  const { error } = validatePost(req.body);

  if (error) {
    return res.status(httpStatus.BAD_REQ).json({ message: 'Some required fields are missing' });
  }

  return next();
};