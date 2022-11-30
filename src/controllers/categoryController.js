const { categoryService } = require('../services');
const httpStatus = require('../utils/httpStatus');

const getCategories = async (_req, res) => {
  const categories = await categoryService.getCategories();

  res.status(httpStatus.OK).json(categories);
};

const createCategory = async (req, res) => {
  const newCategory = await categoryService.createCategory(req.body);

  if (!newCategory) throw Error;

  res.status(httpStatus.CREATED).json(newCategory);
};

module.exports = {
  getCategories,
  createCategory,
};