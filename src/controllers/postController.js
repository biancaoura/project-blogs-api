const { postService, categoryService, userService } = require('../services');
const httpStatus = require('../utils/httpStatus');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;       
  
  const allCategories = await categoryService.getCategories();
  const existingIds = allCategories.map(({ dataValues: { id } }) => id);
  const isIdValid = categoryIds.every((id) => existingIds.includes(id));

  if (!isIdValid) { 
    return res.status(httpStatus.BAD_REQ).json({ message: 'one or more "categoryIds" not found' }); 
  }
  
  const email = req.decoded.payload;
  const userData = await userService.getUserByEmail(email);
  const userId = userData.dataValues.id;
  const newPost = await postService.createPost(userId, title, content, categoryIds);
  
  res.status(httpStatus.CREATED).json(newPost);
};

module.exports = {
  createPost,
};