const { postService, categoryService, userService } = require('../services');
const httpStatus = require('../utils/httpStatus');

const getPosts = async (_req, res) => {
  const posts = await postService.getPosts();
  
  res.status(httpStatus.OK).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await postService.getPostById(id);

  if (!post) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Post does not exist' });
  }

  res.status(httpStatus.OK).json(post);
};

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
  getPosts,
  getPostById,
  createPost,
};