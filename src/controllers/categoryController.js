const { categoryService } = require('../services');
const httpStatus = require('../utils/httpStatus');

const createCategory = async (req, res) => {
  const newCategory = await categoryService.createCategory(req.body);

  if (!newCategory) throw Error;

  res.status(httpStatus.CREATED).json(newCategory);
};

module.exports = {
  createCategory,
};