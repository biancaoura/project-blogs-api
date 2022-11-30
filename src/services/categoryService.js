const { Category } = require('../models');

const getCategories = () => Category.findAll();

const createCategory = (body) => Category.create(body);

module.exports = {
  getCategories,
  createCategory,
};