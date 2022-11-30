const { Category } = require('../models');

const createCategory = (body) => Category.create(body);

module.exports = {
  createCategory,
};